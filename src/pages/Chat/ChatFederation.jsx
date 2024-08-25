import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import images from "/src/assets/images";
import { io } from "socket.io-client";
import { getUserProfile } from "../../service/apiUser";
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

const Chat = () => {
  document.title = "Chat | CNOT PERFORM";

  const [currentUser, setCurrentUser] = useState({
    name: "Henry Wells",
    isActive: true,
    image: images.avatar1,
    _id: "",
  });
  const [search_Menu, setsearch_Menu] = useState(false);
  const [settings_Menu, setsettings_Menu] = useState(false);
  const [other_Menu, setother_Menu] = useState(false);
  const [Chat_Box_Username, setChat_Box_Username] = useState("");
  const [Chat_Box_User_Status, setChat_Box_User_Status] =
    useState("Active Now");
  const [curMessage, setcurMessage] = useState("");
  const [recentChats, setRecentChats] = useState([]);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const navigate = useNavigate();

  const messageBoxRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile();
        setCurrentUser({
          ...currentUser,
          name: userData.user.name || "Henry Wells",
          image: userData.user.image
            ? `http://localhost:3000/${userData.user.image}`
            : images.avatar1,
          _id: userData.user._id,
        });

        // Fetch contacts with role MC
        const response = await fetch(
          `http://localhost:3000/api/contactsMC/${userData.user._id}`
        );
        const contactsData = await response.json();
        const sortedContacts = contactsData.sort((a, b) => {
          if (a.lastMessageTimeDiff === "Aucun message") return 1;
          if (b.lastMessageTimeDiff === "Aucun message") return -1;
          return (
            new Date(b.lastMessageTimeDiff) - new Date(a.lastMessageTimeDiff)
          );
        });
        setContacts(sortedContacts);

        // Set the first contact as the default chat box user
        if (sortedContacts.length > 0) {
          const firstContact = sortedContacts[0];
          setChat_Box_Username(firstContact.name);
          setReceiverId(firstContact._id);
          fetchMessages(userData.user._id, firstContact._id);
        }
      } catch (error) {
        console.error("Error fetching user data or contacts:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authUser"))?.token;

    if (token) {
      const newSocket = io("http://localhost:3000", {
        auth: { token },
        transports: ["websocket", "polling"],
      });

      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Connected to server");
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      newSocket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, message];
          updateRecentChats(updatedMessages);
          return updatedMessages;
        });
        updateContacts();
      });

      newSocket.on("connect_error", (err) => {
        console.error("Connection error:", err.message);
      });

      return () => {
        newSocket.off("connect");
        newSocket.off("disconnect");
        newSocket.off("receiveMessage");
        newSocket.off("connect_error");
        newSocket.close();
      };
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async (userId, contactId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/messages/${userId}/${contactId}`
      );
      const data = await response.json();
      setMessages(data);
      updateRecentChats(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const updateContacts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/contactsMC/${currentUser._id}`
      );
      const contactsData = await response.json();
      const sortedContacts = contactsData.sort((a, b) => {
        if (a.lastMessageTimeDiff === "Aucun message") return 1;
        if (b.lastMessageTimeDiff === "Aucun message") return -1;
        return (
          new Date(b.lastMessageTimeDiff) - new Date(a.lastMessageTimeDiff)
        );
      });
      setContacts(sortedContacts);
    } catch (error) {
      console.error("Error updating contacts:", error);
    }
  };

  const updateRecentChats = (messages) => {
    const recentChatsMap = messages.reduce((acc, message) => {
      const contactId =
        message.sender === currentUser._id ? message.receiver : message.sender;
      const contactName =
        message.sender === currentUser._id
          ? message.receiverName
          : message.senderName;
      if (!acc[contactId]) {
        acc[contactId] = {
          id: contactId,
          name: contactName,
          lastMessage: message.message,
          time: message.timestamp,
          image: `http://localhost:3000/${message.image}`,
        };
      } else if (new Date(message.timestamp) > new Date(acc[contactId].time)) {
        acc[contactId].lastMessage = message.message;
        acc[contactId].time = message.timestamp;
      }
      return acc;
    }, {});
    setRecentChats(
      Object.values(recentChatsMap).sort(
        (a, b) => new Date(b.time) - new Date(a.time)
      )
    );
  };

  const toggleSearch = () => {
    setsearch_Menu(!search_Menu);
  };

  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu);
  };

  const toggleOther = () => {
    setother_Menu(!other_Menu);
  };

  const userChatOpen = (id, name) => {
    setChat_Box_Username(name);
    setReceiverId(id);
    fetchMessages(currentUser._id, id);
    navigate(`/chat/${id}`);
  };

  const addMessage = () => {
    if (curMessage && socket && currentUser._id && receiverId) {
      const messageData = {
        sender: currentUser._id,
        senderName: currentUser.name,
        receiver: receiverId,
        receiverName: Chat_Box_Username,
        message: curMessage,
        timestamp: new Date().toISOString(),
      };
      socket.emit("sendMessage", messageData);
      setcurMessage("");
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, messageData];
        updateRecentChats(updatedMessages);
        return updatedMessages;
      });
      updateContacts();
    } else {
      console.error("Failed to send message:", {
        curMessage,
        socket,
        currentUserId: currentUser._id,
        receiverId,
      });
    }
  };

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  const onKeyPress = (e) => {
    const { key } = e;
    if (key === "Enter") {
      addMessage();
    }
  };

  const searchUsers = () => {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search-user");
    filter = input.value.toUpperCase();
    ul = document.getElementById("recent-list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  };

  return (
    <section className="section hero-section">
      <div className="glow-container">
        <div className="glow-circle left"></div>
        <div className="glow-circle right"></div>
      </div>
      <Container style={{ marginTop: "80px", marginBottom: "20px" }}>
        <Row>
          <Col lg="12">
            <div className="d-lg-flex login-card">
              <div className="chat-leftsidebar me-lg-4">
                <div>
                  <div className="border-bottom py-4">
                    <div className="d-flex">
                      <div className="align-self-center me-3">
                        <img
                          src={currentUser.image}
                          className="avatar-xs rounded-circle"
                          alt=""
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="font-size-15 mb-1 mt-0">
                          {currentUser.name}
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="search-box chat-search-box py-4">
                    <div className="position-relative">
                      <Input
                        onKeyUp={searchUsers}
                        id="search-user"
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                      />
                      <i className="bx bx-search-alt search-icon" />
                    </div>
                  </div>

                  <div className="chat-leftsidebar-nav">
                    <h5 className="font-size-14 mb-3">Contacts</h5>
                    <div>
                      <PerfectScrollbar style={{ height: "410px" }}>
                        {contacts.map((contact) => (
                          <div key={contact._id}>
                            <ul
                              className="list-unstyled chat-list"
                              id="recent-list"
                            >
                              <li key={contact._id}>
                                <Link
                                  to="#"
                                  onClick={() => {
                                    userChatOpen(contact._id, contact.name);
                                  }}
                                >
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                      <div className="avatar-xs me-3">
                                        <span className="rounded-circle bg-soft bg-primary text-primary">
                                          <img
                                            src={`http://localhost:3000/${contact.image}`}
                                            alt={contact.name}
                                          />
                                        </span>
                                      </div>
                                      <div>
                                        <h5 className="font-size-14 mb-0">
                                          {contact.name}
                                        </h5>
                                        <p className="text-muted mb-0">
                                          {contact.lastMessageText}
                                        </p>
                                      </div>
                                    </div>
                                    <p className="text-muted mb-0">
                                      {contact.lastMessageTimeDiff}
                                    </p>
                                  </div>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        ))}
                      </PerfectScrollbar>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-100 user-chat">
                <Card className="login-card">
                  <div className="border-bottom p-4 ">
                    <Row>
                      <Col md="4" xs="9">
                        <h5 className="font-size-15 mb-1 text-white">
                          {Chat_Box_Username}
                        </h5>
                      </Col>
                      <Col md="8" xs="3">
                        <ul className="list-inline user-chat-nav mb-0 text-end">
                          <li className="list-inline-item d-none d-sm-inline-block">
                            <Dropdown
                              isOpen={search_Menu}
                              toggle={toggleSearch}
                            >
                              <DropdownToggle className="btn nav-btn" tag="i">
                                <i className="bx bx-search-alt-2" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-md">
                                <Form className="p-3">
                                  <FormGroup className="m-0">
                                    <InputGroup>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search ..."
                                        aria-label="Recipient's username"
                                      />
                                      <Button color="primary" type="submit">
                                        <i className="mdi mdi-magnify" />
                                      </Button>
                                    </InputGroup>
                                  </FormGroup>
                                </Form>
                              </DropdownMenu>
                            </Dropdown>
                          </li>
                          <li className="list-inline-item  d-none d-sm-inline-block">
                            <Dropdown
                              isOpen={settings_Menu}
                              toggle={toggleSettings}
                            >
                              <DropdownToggle className="btn nav-btn" tag="i">
                                <i className="bx bx-cog" />
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem href="#">
                                  View Profile
                                </DropdownItem>
                                <DropdownItem href="#">Clear chat</DropdownItem>
                                <DropdownItem href="#">Muted</DropdownItem>
                                <DropdownItem href="#">Delete</DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </li>
                          <li className="list-inline-item">
                            <Dropdown isOpen={other_Menu} toggle={toggleOther}>
                              <DropdownToggle className="btn nav-btn" tag="i">
                                <i className="bx bx-dots-horizontal-rounded" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="#">Action</DropdownItem>
                                <DropdownItem href="#">
                                  Another Action
                                </DropdownItem>
                                <DropdownItem href="#">
                                  Something else
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </div>

                  <div>
                    <div className="chat-conversation p-3">
                      <ul className="list-unstyled">
                        <PerfectScrollbar
                          style={{ height: "470px" }}
                          containerRef={(ref) => (messageBoxRef.current = ref)}
                        >
                          {messages &&
                            messages.map((message, index) => (
                              <li
                                key={`msg-${index}`}
                                className={
                                  message.sender === currentUser._id
                                    ? "right"
                                    : ""
                                }
                              >
                                <div className="conversation-list">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      href="#"
                                      tag="a"
                                      className="dropdown-toggle"
                                    >
                                      <i className="bx bx-dots-vertical-rounded" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                      <DropdownItem
                                        onClick={(e) =>
                                          console.log("Copy message")
                                        }
                                        href="#"
                                      >
                                        Copy
                                      </DropdownItem>
                                      <DropdownItem href="#">Save</DropdownItem>
                                      <DropdownItem href="#">
                                        Forward
                                      </DropdownItem>
                                      <DropdownItem
                                        onClick={(e) =>
                                          console.log("Delete message")
                                        }
                                        href="#"
                                      >
                                        Delete
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                  <div className="ctext-wrap">
                                    <div className="conversation-name text-dark">
                                      {message.senderName}
                                    </div>
                                    <p className=" text-dark">
                                      {message.message}
                                    </p>
                                    <p className="chat-time mb-0 text-dark">
                                      <i className="bx bx-time-five me-1 align-middle"></i>{" "}
                                      {moment(message.timestamp).format("LT")}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </PerfectScrollbar>
                      </ul>
                    </div>
                    <div className="chat-input-section p-3">
                      <Row>
                        <Col>
                          <div className="position-relative">
                            <input
                              type="text"
                              value={curMessage}
                              onKeyPress={onKeyPress}
                              onChange={(e) => setcurMessage(e.target.value)}
                              className="form-control chat-input"
                              placeholder="Enter Message..."
                            />
                            <div className="chat-input-links">
                              <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                  <Link to="#">
                                    <i
                                      className="mdi mdi-emoticon-happy-outline"
                                      id="Emojitooltip"
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target="Emojitooltip"
                                    >
                                      Emojis
                                    </UncontrolledTooltip>
                                  </Link>
                                </li>
                                <li className="list-inline-item">
                                  <Link to="#">
                                    <i
                                      className="mdi mdi-file-image-outline"
                                      id="Imagetooltip"
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target="Imagetooltip"
                                    >
                                      Images
                                    </UncontrolledTooltip>
                                  </Link>
                                </li>
                                <li className="list-inline-item">
                                  <Link to="#">
                                    <i
                                      className="mdi mdi-file-document-outline"
                                      id="Filetooltip"
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target="Filetooltip"
                                    >
                                      Add Files
                                    </UncontrolledTooltip>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Col>
                        <Col className="col-auto">
                          <Button
                            type="button"
                            color="primary"
                            onClick={addMessage}
                            className="btn btn-primary btn-rounded chat-send w-md "
                          >
                            <span className="d-none d-sm-inline-block me-2">
                              Send
                            </span>{" "}
                            <i className="mdi mdi-send" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Chat;
