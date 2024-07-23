import React, { useEffect, useState } from "react";

import { Container, Row, Col, Card, Spinner } from "reactstrap";
import "@fullcalendar/bootstrap/main.css";

import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import { getEvents } from "../../../service/event-service";

import {
  getCategories as onGetCategories,
  getEvents as onGetEvents,
} from "../../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

const events = () => {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { events, categories } = useSelector((state) => ({
    events: state.calendar.events,
    categories: state.calendar.categories,
  }));

  useEffect(() => {
    dispatch(onGetCategories());
    dispatch(onGetEvents());
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      setLoading(true); // Set loading to true before starting the fetch
      try {
        const data = await getEvents();
        let events = [];
        if (isMounted) {
          data.data.message.forEach((event) => {
            let evt = {
              id: event._id,
              title: event.title,
              start: new Date(event.startDate).getDate(),
              end: new Date(event.endDate).getDate(),
            };
            events.push(evt);
          });
          setEventList(events);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        if (isMounted) {
          setLoading(false); // Set loading to false only if the component is still mounted
        }
      }
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log(eventList);
  }, [eventList]);

  if (loading) return <Spinner color="info"></Spinner>;

  return (
    <React.Fragment>
      <section className="section bg-white" id="news">
        <Container>
          <Row>
            <Col lg="12">
              <div className="mb-5 text-center">
                <div className="small-title">Evènements</div>
                <h4>Notre planning</h4>
              </div>
            </Col>
          </Row>

          <Row>
            <Card>
              <FullCalendar
                plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin]}
                slotDuration={"00:15:00"}
                handleWindowResize={true}
                themeSystem="bootstrap"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,dayGridWeek,dayGridDay",
                }}
                events={events}
                editable={false}
                droppable={false}
                selectable={false}
              />
            </Card>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default events;
