import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import bridge from "@vkontakte/vk-bridge";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import { Icon28AddOutline, Icon28EditOutline } from "@vkontakte/icons";
import {
  Cell,
  Avatar,
  RichCell,
  Header,
  Button,
  Input,
  FormLayout,
  FormLayoutGroup,
  Select,
} from "@vkontakte/vkui";
import { YMaps, Map, Placemark, PlacemarkGeometry } from "react-yandex-maps";

const Places = ({ id, setModal, places }) => {
  const mapStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    width: 340,
    height: 222,
    borderRadius: 8,
    border: "1px solid var(--placeholder_icon_background)",
    objectFit: "cover",
    display: "block",
  };
  const [curPos, setCurPos] = useState([55.75, 37.57]);
  useEffect(() => {
    console.log(curPos);
  }, [curPos]);
  return (
    <Panel id={id}>
      <PanelHeader>Места</PanelHeader>
      <Group>
        <Div>
          <Cell size="xl">
            {
              <YMaps>
                <Map
                  id={"map"}
                  style={mapStyle}
                  defaultState={{ center: [20, 30], zoom: 9 }}
                  state={{ center: curPos, zoom: 9 }}
                >
                  {places.map((place, idx) => {
                    return (
                      <Placemark
                        geometry={[
                          place.mapPosition.coordinates[0],
                          place.mapPosition.coordinates[1],
                        ]}
                      />
                    );
                  })}
                </Map>
              </YMaps>
            }
          </Cell>
          <Div>
            {places.map((place, idx) => {
              return (
                <RichCell
                  key={idx}
                  before={
                    <Avatar
                      size={48}
                      src={"https://bel.cultreg.ru/uploads/" + place.image.name}
                    />
                  }
                  actions={
                    <React.Fragment>
                      <Button href="#map">На карте</Button>
                    </React.Fragment>
                  }
                  text={place.description}
                  onClick={() => {
                    setCurPos([
                      place.mapPosition.coordinates[0],
                      place.mapPosition.coordinates[1],
                    ]);
                  }}
                  multiline
                  disable
                >
                  {place.name}
                </RichCell>
              );
            })}
          </Div>
        </Div>
      </Group>
    </Panel>
  );
};

Places.propTypes = {
  id: PropTypes.string.isRequired,
  places: PropTypes.array,
};

export default Places;
