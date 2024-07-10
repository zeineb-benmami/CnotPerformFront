import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import {
  Button,
  Card,
  Col,
  Container,
  Input,
  Label,
  Row,
  Nav,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  NavItem,
  NavLink,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import classnames from "classnames";

import { map } from "lodash";

// Import Editor
// import { Editor } from "react-draft-wysiwyg";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { bookmarkEmail, getEmails, getMailAccount, verifPassword } from "../../service/mailService";
import {
  getMailsLists as onGetMailsLists,
  getSelectedMails as onGetSelectedMails,
  updateMail as onUpdateMail,
} from "/src/store/mails/actions";

//Import Email Topbar
import EmailToolbar from "./email-toolbar";

//redux
import { useSelector, useDispatch } from "react-redux";

const EmailInbox = (props) => {
  //meta title
  document.title = "CnotInbox";

  const [mailslists, setMailslists] = useState([]);
  const [numberUnseen, setNumberUnseen] = useState(0);
  const [mailAccount, setMailAccount] = useState("");
  const [modal, setModal] = useState(false); // Compose modal
  const [secondModalOpen, setSecondModalOpen] = useState(true); // Second modal
  const [password, setPassword] = useState('');
  const [account, setAccount] = useState(null);

  const fetchEmails = async (account) => {
    try {
      const result = await getEmails(account);
      const data = result.data;
      setNumberUnseen(data.filter((email) => email.status === "Unseen").length);
      setMailslists(data.reverse());
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const checkPassword = async (password) =>{
    const response = await verifPassword(mailAccount,password);
    if(response.data === true){
      handleCloseSecondModal();
      setAccount({mailaddress : mailAccount, password: password});
      console.log({mailaddress : mailAccount, password: password});
      
      fetchEmails({mailaddress : mailAccount, password: password});
      toast.success("Fetching mails ...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
      
    }
    else{
      toast.error('Wrong password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        }); 
    }
    
  }

  const fetchMailAccount = async (id) => {
    try {
      const result = await getMailAccount(id);
      setMailAccount(result.data.adress);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const mailid = localStorage.getItem("mailId");
    const id = localStorage.getItem("id");
    if (id && mailid) {
      fetchMailAccount(id);
    }
  }, []);

  const dispatch = useDispatch();

  const { selectedmails } = useSelector((state) => ({
    mailslists: state.mails.mailslists,
    selectedmails: state.mails.selectedmails,
  }));

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(onGetMailsLists(0));
  }, [dispatch]);

  const handleSelect = (selectedItems) => {
    dispatch(onGetSelectedMails(selectedItems));
  };

  const toggleModal = () => setModal(!modal);
  const toggleSecondModal = () => setSecondModalOpen(!secondModalOpen);

  const handleCloseSecondModal = () => setSecondModalOpen(false);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Email" breadcrumbItem="Inbox" />

          <Row>
            <Col xs="12">
              {/* Render Email SideBar */}
              <Card className="email-leftbar">
                <Button
                  type="button"
                  color="danger"
                  onClick={toggleModal}
                  block
                >
                  Compose
                </Button>
                <div className="mail-list mt-4">
                  <Nav
                    tabs
                    className="nav-tabs-custom"
                    vertical
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 0,
                        })}
                        onClick={() => {
                          setActiveTab(0);
                          dispatch(onGetMailsLists(0));
                        }}
                      >
                        <i className="mdi mdi-email-outline me-2"></i> Inbox{" "}
                        <span className="ml-1 float-end">(18)</span>
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 6,
                        })}
                        onClick={() => {
                          setActiveTab(6);
                          dispatch(onGetMailsLists(6));
                        }}
                      >
                        <i className="mdi mdi-star-outline me-2"></i>Starred
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 1,
                        })}
                        onClick={() => {
                          setActiveTab(1);
                          dispatch(onGetMailsLists(1));
                        }}
                      >
                        <i className="mdi mdi-diamond-stone me-2"></i>Important
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 2,
                        })}
                        onClick={() => {
                          setActiveTab(2);
                          dispatch(onGetMailsLists(2));
                        }}
                      >
                        <i className="mdi mdi-file-outline me-2"></i>Draft
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 3,
                        })}
                        onClick={() => {
                          setActiveTab(3);
                          dispatch(onGetMailsLists(3));
                        }}
                      >
                        <i className="mdi mdi-email-check-outline me-2"></i>Sent
                        Mail
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 4,
                        })}
                        onClick={() => {
                          setActiveTab(4);
                          dispatch(onGetMailsLists(4));
                        }}
                      >
                        <i className="mdi mdi-trash-can-outline me-2"></i>Trash
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>

                <h6 className="mt-4">Labels</h6>

                <div className="mail-list mt-1">
                  <Link to="#">
                    <span className="mdi mdi-arrow-right-drop-circle text-info float-end"></span>
                    Theme Support
                  </Link>
                  <Link to="#">
                    <span className="mdi mdi-arrow-right-drop-circle text-warning float-end"></span>
                    Freelance
                  </Link>
                  <Link to="#">
                    <span className="mdi mdi-arrow-right-drop-circle text-primary float-end"></span>
                    Social
                  </Link>
                  <Link to="#">
                    <span className="mdi mdi-arrow-right-drop-circle text-danger float-end"></span>
                    Friends
                  </Link>
                  <Link to="#">
                    <span className="mdi mdi-arrow-right-drop-circle text-success float-end"></span>
                    Family
                  </Link>
                </div>
              </Card>

              <Modal
                isOpen={modal}
                role="dialog"
                autoFocus={true}
                centered={true}
                className="exampleModal"
                tabIndex="-1"
                toggle={toggleModal}
              >
                <div className="modal-content">
                  <ModalHeader toggle={toggleModal}>New Message</ModalHeader>
                  <ModalBody>
                    <form>
                      <div className="mb-3">
                        <Input
                          type="email"
                          className="form-control"
                          placeholder="To"
                        />
                      </div>

                      <div className="mb-3">
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Subject"
                        />
                      </div>
                      {/* <Editor
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                      /> */}
                      <CKEditor
                        editor={ClassicEditor}
                        data="<p>Hello from CKEditor 5!</p>"
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                        }}
                      />
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>
                      Close
                    </Button>
                    <Button color="primary">
                      Send <i className="fab fa-telegram-plane ms-1"></i>
                    </Button>
                  </ModalFooter>
                </div>
              </Modal>

              <Modal
                isOpen={secondModalOpen}
                toggle={handleCloseSecondModal}
                backdrop="static"
              
              >
                <ModalHeader toggle={handleCloseSecondModal}>
                  Entrer le mot de passe de compte ({mailAccount})
                </ModalHeader>
                <ModalBody>
                <input type="text" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} className="border-stroke dark:border-form-strokedark dark:bg-form-input focus:border-primary dark:focus:border-primary active:border-primary bg-transparent w-full rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter" />
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={handleCloseSecondModal}>
                    Close
                  </Button>
                  <Button color="primary" onClick={() => checkPassword(password)}> Envoyer </Button>
                </ModalFooter>
              </Modal>

              <div className="email-rightbar mb-3">
                <Card>
                  {mailslists.length > 0 ? (
                    <>
                      {/* Render Email Top Tool Bar */}
                      <EmailToolbar
                        selectedmails={selectedmails}
                        activeTab={activeTab}
                      />
                      <ul className="message-list">
                        {map(mailslists, (mail, key) => (
                          
                          <li key={key} className={mail.unread ? "unread" : ""}>
                          <div className="col-mail col-mail-1">
                            <div className="checkbox-wrapper-mail">
                              <Input
                                type="checkbox"
                                value={mail.id}
                                id={mail.id}
                                name="emailcheckbox"
                                onChange={(e) => console.log(e.target.value)}
                                onClick={(e) => handleSelect(e.target.value)}
                                checked={selectedmails.includes(mail._id)}
                              />
                              <Label htmlFor={mail.id} className="toggle" />
                            </div>
                            <Link to="#" className="title">
                              {mail.from}
                            </Link>
                            {mail.bookmarked ? (
                              <span
                                className="star-toggle fas fa-star text-warning"
                                style={{ cursor: "pointer" }}
                              />
                            ) : (
                              <span
                                className="star-toggle far fa-star"
                                style={{ cursor: "pointer" }}
                                onClick={async () => {
                                  await bookmarkEmail(mail._id);
                                  fetchEmails({ mailaddress: mailAccount, password: password });
                                }}
                              />
                            )}
                          </div>
                          <div className="col-mail col-mail-2">
                            <div className="subject">
                              <span
                              >{mail.subject.length > 25 ? `${mail.subject.substring(0, 30)}...` : mail.subject}</span>
                            </div>
                            <div className="date">{new Date(mail.date).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',  
                                hour12: true
                              })}</div>
                          </div>
                        </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <div className="align-items-center text-center p-4">
                      {" "}
                      <i className="mdi mdi-email-outline me-2 display-5"></i>{" "}
                      <h4> No Recored Found </h4>
                    </div>
                  )}
                </Card>
                {mailslists.length > 0 && (
                  <Row>
                    <Col xs="7">Showing 1 - 20 of 1,524</Col>
                    <Col xs="5">
                      <div className="btn-group float-end">
                        <Button type="button" color="success" size="sm">
                          <i className="fa fa-chevron-left" />
                        </Button>
                        <Button type="button" color="success" size="sm">
                          <i className="fa fa-chevron-right" />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(EmailInbox);
