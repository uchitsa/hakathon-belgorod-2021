import React, { useState } from "react";
import PropTypes from "prop-types";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {
  Icon28InfoCircleOutline,
} from "@vkontakte/icons";
import {
  Avatar,
  RichCell,
} from "@vkontakte/vkui";

import { AboutEvents } from "../components/About";

const Events = ({ id, setModal, events }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Мероприятия</PanelHeader>
      <Group>
        <Div>
          {events.map((event, idx) => {
            if (event.end > Date.now()) {
              return (
                <RichCell
                  description={event.about}
                  before={
                    <Avatar
                      size={48}
                      src={"https://bel.cultreg.ru/uploads/" + event.image.name}
                    />
                  }
                  after={
                    <Icon28InfoCircleOutline
                      onClick={() => {
                        setModal(
                          <AboutEvents
                            id={event._id}
                            data={event}
                            setModal={setModal}
                          />
                        );
                      }}
                    />
                  }
                  // caption={event.tags ? event.tags[0] : ""}
                  multiline
                  disabled
                >
                  {event.name}
                </RichCell>
              );
            }
          })}
        </Div>
      </Group>
    </Panel>
  );
};
Events.propTypes = {
  id: PropTypes.string.isRequired,
  events: PropTypes.array,
};

export default Events;
