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
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import images from "/src/assets/images";
import { io } from "socket.io-client";
import { getUserProfile } from "../../service/apiUser";
import moment from "moment";
import 'moment/locale/fr';

moment.locale('fr');

const Chat = () => {
  document.title = "Chat | Skote - Vite React Admin & Dashboard Template";

  const [messageBox, setMessageBox] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "Henry Wells",
    isActive: true,
    image: images.avatar1,
    _id: '',
  });
  const [menu1, setMenu1] = useState(false);
  const [search_Menu, setsearch_Menu] = useState(false);
  const [settings_Menu, setsettings_Menu] = useState(false);
  const [other_Menu, setother_Menu] = useState(false);
  const [Chat_Box_Username, setChat_Box_Username] = useState("");
  const [Chat_Box_User_Status, setChat_Box_User_Status] = useState("Active Now");
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

        // Fetch contacts with last message time difference
        const response = await fetch(`http://localhost:3000/api/contacts/${userData.user._id}`);
        const contactsData = await response.json();
        const sortedContacts = contactsData.sort((a, b) => {
          if (a.lastMessageTimeDiff === "Aucun message") return 1;
          if (b.lastMessageTimeDiff === "Aucun message") return -1;
          return new Date(b.lastMessageTimeDiff) - new Date(a.lastMessageTimeDiff);
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
    const token = JSON.parse(localStorage.getItem('authUser'))?.token;

    if (token) {
      const newSocket = io('http://localhost:3000', {
        auth: { token },
        transports: ['websocket', 'polling']
      });

      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Connected to server');
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      newSocket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, message];
          updateRecentChats(updatedMessages);
          return updatedMessages;
        });
        updateContacts();
      });

      newSocket.on('connect_error', (err) => {
        console.error('Connection error:', err.message);
      });

      return () => {
        newSocket.off('connect');
        newSocket.off('disconnect');
        newSocket.off('receiveMessage');
        newSocket.off('connect_error');
        newSocket.close();
      };
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async (userId, contactId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/messages/${userId}/${contactId}`);
      const data = await response.json();
      setMessages(data);
      updateRecentChats(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const updateContacts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/contacts/${currentUser._id}`);
      const contactsData = await response.json();
      const sortedContacts = contactsData.sort((a, b) => {
        if (a.lastMessageTimeDiff === "Aucun message") return 1;
        if (b.lastMessageTimeDiff === "Aucun message") return -1;
        return new Date(b.lastMessageTimeDiff) - new Date(a.lastMessageTimeDiff);
      });
      setContacts(sortedContacts);
    } catch (error) {
      console.error("Error updating contacts:", error);
    }
  };

  const updateRecentChats = (messages) => {
    const recentChatsMap = messages.reduce((acc, message) => {
      const contactId = message.sender === currentUser._id ? message.receiver : message.sender;
      const contactName = message.sender === currentUser._id ? message.receiverName : message.senderName;
      if (!acc[contactId]) {
        acc[contactId] = { id: contactId, name: contactName, lastMessage: message.message, time: message.timestamp, image: `http://localhost:3000/${message.image}` };
      } else if (new Date(message.timestamp) > new Date(acc[contactId].time)) {
        acc[contactId].lastMessage = message.message;
        acc[contactId].time = message.timestamp;
      }
      return acc;
    }, {});
    setRecentChats(Object.values(recentChatsMap).sort((a, b) => new Date(b.time) - new Date(a.time)));
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
        timestamp: new Date().toISOString()
      };
      socket.emit('sendMessage', messageData);
      setcurMessage('');
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, messageData];
        updateRecentChats(updatedMessages);
        return updatedMessages;
      });
      updateContacts();
    } else {
      console.error('Failed to send message:', { curMessage, socket, currentUserId: currentUser._id, receiverId });
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
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Skote" breadcrumbItem="Chat" />

          <Row>
            <Col lg="12">
              <div className="d-lg-flex">
                <div className="chat-leftsidebar me-lg-4">
                  <div>
                    <div className="py-4 border-bottom">
                      <div className="d-flex">
                        <div className="align-self-center me-3">
                          <img
                            src={currentUser.image}
                            className="avatar-xs rounded-circle"
                            alt=""
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="font-size-15 mt-0 mb-1">
                            {currentUser.name}
                          </h5>
                          <p className="text-muted mb-0">
                            <i className="mdi mdi-circle text-success align-middle me-2" />
                            En ligne
                          </p>
                        </div>

                        <div>
                          <Dropdown
                            isOpen={menu1}
                            toggle={() => setMenu1(!menu1)}
                            className="chat-noti-dropdown active"
                          >
                            <DropdownToggle tag="a" className="btn">
                              <i className="bx bx-bell bx-tada"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                              <DropdownItem href="#">Action</DropdownItem>
                              <DropdownItem href="#">Another action</DropdownItem>
                              <DropdownItem href="#">Something else</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
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
                          placeholder="Recherche..."
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
                              <ul className="list-unstyled chat-list" id="recent-list">
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
                                          <span className="rounded-circle bg-primary bg-soft text-primary">
                                            <img src={`http://localhost:3000/${contact.image}`} alt={contact.name} />
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
                  <Card>
                    <div className="p-4 border-bottom ">
                      <Row>
                        <Col md="4" xs="9">
                          <h5 className="font-size-15 mb-1">
                            {Chat_Box_Username}
                          </h5>

                         
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
                                        <DropdownItem onClick={(e) => console.log('Copy message')} href="#">
                                          Copy
                                        </DropdownItem>
                                        <DropdownItem href="#">
                                          Save
                                        </DropdownItem>
                                        <DropdownItem href="#">
                                          Forward
                                        </DropdownItem>
                                        <DropdownItem onClick={(e) => console.log('Delete message')} href="#">
                                          Delete
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <div className="ctext-wrap">
                                      <div className="conversation-name">
                                        {message.senderName}
                                      </div>
                                      <p>{message.message}</p>
                                      <p className="chat-time mb-0">
                                        <i className="bx bx-time-five align-middle me-1"></i>{" "}
                                        {moment(message.timestamp).format("LT")}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </PerfectScrollbar>
                        </ul>
                      </div>
                      <div className="p-3 chat-input-section">
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
      </div>
    </React.Fragment>
  );
};

export default Chat;
