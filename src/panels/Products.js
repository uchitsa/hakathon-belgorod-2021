import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import bridge from "@vkontakte/vk-bridge";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import { Icon28AddOutline, Icon28EditOutline } from "@vkontakte/icons";
import { AboutProduct } from "../components/About";
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
  CardGrid,
  Card,
} from "@vkontakte/vkui";

import { getData } from "../components/Requests";

const Products = ({ id, modal, setModal, products }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Изделия</PanelHeader>
      {products
        ? products.map((product, idx) => {
            return (
              <RichCell
                disabled
                multiline
                before={
                  <Avatar
                    size={72}
                    src={"https://bel.cultreg.ru/uploads/" + product.image.name}
                  />
                }
                text={product.category ? product.category.name : null}
                caption={new Date(product.updateDate).toLocaleString()}
                after={
                  product.price
                    ? product.price.value + " ₽"
                    : () => {
                        console.log(product);
                      }
                }
                actions={
                  <React.Fragment>
                    <Button
                      mode="secondary"
                      onClick={() => {
                        setModal(
                          <AboutProduct
                            id={product._id}
                            data={product}
                            setModal={setModal}
                          />
                        );
                      }}
                    >
                      Подробнее
                    </Button>
                  </React.Fragment>
                }
              >
                {product.name}
              </RichCell>
            );
          })
        : null}
      <Group>
        <CardGrid size="l"></CardGrid>
      </Group>
    </Panel>
  );
};

Products.propTypes = {
  id: PropTypes.string.isRequired,
  products: PropTypes.array,
  setModal: PropTypes.func,
};

export default Products;
