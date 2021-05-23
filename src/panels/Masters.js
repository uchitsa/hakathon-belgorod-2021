import React, { useState } from "react";
import PropTypes from "prop-types";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {
  Icon28AddOutline,
  Icon28EditOutline,
  Icon28InfoCircleOutline,
} from "@vkontakte/icons";
import { SimpleCell, Avatar, Cell } from "@vkontakte/vkui";
import { AboutMaster } from "../components/About";

const Masters = ({ id, setModal, masters }) => {
  const [User, setUser] = useState(null);

  return (
    <Panel id={id}>
      <PanelHeader>Мастера</PanelHeader>
      <Group>
        <Div>
          {masters ? null : <Cell>Данные грузятся</Cell>}
          {masters.map((master, idx) => {
            return (
              <SimpleCell
                before={
                  <Avatar
                    size={48}
                    src={"https://bel.cultreg.ru/uploads/" + master.image.name}
                  />
                }
                after={
                  <Icon28InfoCircleOutline
                    onClick={() => {
                      setModal(
                        <AboutMaster
                          id={master._id}
                          data={master}
                          setModal={setModal}
                        />
                      );
                    }}
                  />
                }
                description={master.about}
                multiline
                disabled
              >
                {master.name}
              </SimpleCell>
            );
          })}
        </Div>
      </Group>
    </Panel>
  );
};

Masters.propTypes = {
  id: PropTypes.string.isRequired,
  masters: PropTypes.array,
};

export default Masters;
