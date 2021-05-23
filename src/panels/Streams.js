import React, { useState } from "react";
import PropTypes from "prop-types";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import { Button, RichCell } from "@vkontakte/vkui";
import "./Home.css";

const Streams = ({ id, setModal, streams }) => {
  const largeImageStyles = {
    width: 140,
    height: 100,
    borderRadius: 8,
    border: "1px solid var(--placeholder_icon_background)",
    objectFit: "cover",
  };
  return (
    <Panel id={id}>
      <PanelHeader>Стримы</PanelHeader>
      <Div>
        {streams.map((stream, idx) => {
          if (stream.end > Date.now())
            return (
              <RichCell
                key={idx}
                size="l"
                before={
                  <img
                    style={largeImageStyles}
                    src={"https://bel.cultreg.ru/uploads/" + stream.cover.name}
                  />
                }
                actions={
                  <React.Fragment>
                    <Button
                      mode="secondary"
                      href={
                        "https://bel.cultreg.ru/live/streams/" +
                        stream._id +
                        "/" +
                        stream.sysName
                      }
                    >
                      Смотреть
                    </Button>
                  </React.Fragment>
                }
                multiline
              >
                {stream.name}
              </RichCell>
            );
        })}
      </Div>
    </Panel>
  );
};

Streams.propTypes = {
  id: PropTypes.string.isRequired,
  streams: PropTypes.array,
};

export default Streams;
