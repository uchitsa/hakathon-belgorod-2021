import React, { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import { Cell, Avatar, RichCell, Header, Link, Button } from "@vkontakte/vkui";
import { getData } from "../components/Requests";

const Articles = ({ id, setModal, articles }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Профиль</PanelHeader>
      <Div>
        <RichCell disabled></RichCell>
      </Div>
      <Group header={<Header mode="secondary">Мои беседы</Header>}>
        <Div>
          {articles
            ? articles.map((Articles, idx) => {
                return (
                  <Link key={idx} href={Articles.url} target="_blank">
                    <Cell before={<Avatar />} description={Articles.subject}>
                      {Articles.name}
                    </Cell>
                  </Link>
                );
              })
            : null}
        </Div>
      </Group>
    </Panel>
  );
};

Articles.propTypes = {
  id: PropTypes.string.isRequired,
  articles: PropTypes.array,
};

export default Articles;
