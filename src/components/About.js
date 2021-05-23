import React from "react";
import PropTypes from "prop-types";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {
  Icon12Clock,
  Icon24Dismiss,
  Icon28AddOutline,
  Icon28ClockCircleFillGray,
  Icon28EditOutline,
  Icon28LocationOutline,
} from "@vkontakte/icons";
import {
  Cell,
  Button,
  Card,
  CardScroll,
  ModalPage,
  ModalRoot,
  ModalPageHeader,
  PanelHeaderButton,
  Title,
  Gallery,
} from "@vkontakte/vkui";
const AboutProduct = ({ id, setModal, data }) => {
  const largeImageStyles = {
    marginLeft: "auto",
    marginRight: "auto",
    width: 340,
    height: 222,
    borderRadius: 8,
    border: "1px solid var(--placeholder_icon_background)",
    objectFit: "cover",
    display: "block",
  };
  return (
    <ModalRoot activeModal={id}>
      <ModalPage
        id={id}
        onClose={() => {
          setModal(null);
        }}
        header={
          <ModalPageHeader
            right={
              <PanelHeaderButton onClick={() => setModal(null)}>
                <Icon24Dismiss />
              </PanelHeaderButton>
            }
          />
        }
      >
        <Cell size="l" header={data.name} subtitle={data.description}>
          <img
            style={largeImageStyles}
            src={"https://bel.cultreg.ru/uploads/" + data.image.name}
          />
        </Cell>
        <Card size="l" mode="shadow">
          <Title
            style={{
              marginLeft: 16,
              marginTop: 16,
              marginLeft: 16,
              marginBottom: 16,
            }}
          >
            {data.content.map((el, idx) => {
              return (
                <Div id={idx} dangerouslySetInnerHTML={{ __html: el.text }} />
              );
            })}
          </Title>
          {data.master.contacts.map((el, idx) => {
            if (el.type === "vk") {
              return (
                <Div>
                  <Button size="xl" href={el.vk}>
                    Написать в ВК
                  </Button>
                </Div>
              );
            } else if (el.type === "ok") {
              return (
                <Div>
                  <Button size="xl" href={el.ok}>
                    Написать в OK
                  </Button>
                </Div>
              );
            } else if (el.type === "phone") {
              return (
                <Div>
                  <Button size="xl" href={"tel:+7" + el.phone}>
                    Позвонить
                  </Button>
                </Div>
              );
            } else if (el.type === "instagram") {
              return (
                <Div>
                  <Button size="xl" url={el.instagram}>
                    Instagram
                  </Button>
                </Div>
              );
            } else {
              return (
                <Div>
                  <Button size="xl" url={el[Object.keys(el)[1]]}>
                    {Object.keys(el)[1]}
                  </Button>
                </Div>
              );
            }
          })}
        </Card>
      </ModalPage>
    </ModalRoot>
  );
};
const AboutMaster = ({ id, setModal, data }) => {
  const largeImageStyles = {
    marginLeft: "auto",
    marginRight: "auto",
    width: 340,
    height: 340,
    borderRadius: 8,
    border: "1px solid var(--placeholder_icon_background)",
    objectFit: "scale-down",
    display: "block",
  };
  return (
    <ModalRoot activeModal={"master" + id}>
      <ModalPage
        id={"master" + id}
        onClose={() => {
          setModal(null);
        }}
        header={
          <ModalPageHeader
            right={
              <PanelHeaderButton onClick={() => setModal(null)}>
                <Icon24Dismiss />
              </PanelHeaderButton>
            }
          />
        }
      >
        <Cell size="l" header={data.name} subtitle={data.about}>
          <img
            style={largeImageStyles}
            src={"https://bel.cultreg.ru/uploads/" + data.image.name}
          />
        </Cell>
        <Card size="l" mode="shadow">
          <Title
            style={{
              marginLeft: 16,
              marginTop: 16,
              marginLeft: 16,
              marginBottom: 16,
            }}
          >
            {data.gallery.length > 0 ? (
              <Gallery slideWidth="90%" align="center" style={{ height: 150 }}>
                {data.gallery.map((el, idx) => {
                  return (
                    <img
                      style={{ objectFit: "scale-down" }}
                      src={"https://bel.cultreg.ru/uploads/" + el.name}
                    />
                  );
                })}
              </Gallery>
            ) : (
              ""
            )}
            {data.content.map((el, idx) => {
              return (
                <Div id={idx} dangerouslySetInnerHTML={{ __html: el.text }} />
              );
            })}
          </Title>
          <Div>
            <Button size="xl" href={"mailto:" + data.email}>
              E-mail
            </Button>
          </Div>
          {data.contacts.map((el, idx) => {
            if (el.type === "vk") {
              return (
                <Div>
                  <Button size="xl" href={el.vk}>
                    Написать в ВК
                  </Button>
                </Div>
              );
            } else if (el.type === "ok") {
              return (
                <Div>
                  <Button size="xl" href={el.ok}>
                    Написать в OK
                  </Button>
                </Div>
              );
            } else if (el.type === "phone") {
              return (
                <Div>
                  <Button size="xl" href={"tel:+7" + el.phone}>
                    Позвонить
                  </Button>
                </Div>
              );
            } else if (el.type === "instagram") {
              return (
                <Div>
                  <Button size="xl" url={el.instagram}>
                    Instagram
                  </Button>
                </Div>
              );
            } else {
              return (
                <Div>
                  <Button size="xl" url={el[Object.keys(el)[1]]}>
                    {Object.keys(el)[1]}
                  </Button>
                </Div>
              );
            }
          })}
        </Card>
      </ModalPage>
    </ModalRoot>
  );
};
const AboutEvents = ({ id, setModal, data }) => {
  const largeImageStyles = {
    marginLeft: "auto",
    marginRight: "auto",
    width: 340,
    height: 340,
    borderRadius: 8,
    border: "1px solid var(--placeholder_icon_background)",
    objectFit: "scale-down",
    display: "block",
  };
  return (
    <ModalRoot activeModal={"event" + id}>
      <ModalPage
        id={"event" + id}
        onClose={() => {
          setModal(null);
        }}
        header={
          <ModalPageHeader
            right={
              <PanelHeaderButton onClick={() => setModal(null)}>
                <Icon24Dismiss />
              </PanelHeaderButton>
            }
          />
        }
      >
        <Cell size="l" header={data.name} subtitle={data.about}>
          <img
            style={largeImageStyles}
            src={"https://bel.cultreg.ru/uploads/" + data.image.name}
          />
        </Cell>
        <Card size="l" mode="shadow">
          <Title
            style={{
              marginLeft: 16,
              marginTop: 16,
              marginLeft: 16,
              marginBottom: 16,
            }}
          >
            <Gallery slideWidth="90%" align="right" style={{ height: 150 }}>
              {data.gallery.map((el, idx) => {
                return (
                  <img
                    style={{ objectFit: "scale-down" }}
                    src={"https://bel.cultreg.ru/uploads/" + el.name}
                  />
                );
              })}
            </Gallery>

            {data.content.map((el, idx) => {
              return (
                <Div id={idx} dangerouslySetInnerHTML={{ __html: el.text }} />
              );
            })}
            <Div>
              <Cell before={<Icon28ClockCircleFillGray />}>
                {new Date(data.start).toLocaleString()}
              </Cell>

              <Cell multiline before={<Icon28LocationOutline />}>
                {data.locales[2].name +
                  "," +
                  data.locales[1].name +
                  "," +
                  data.locales[0].name +
                  "," +
                  data.organization.name}
              </Cell>
            </Div>
          </Title>
        </Card>
      </ModalPage>
    </ModalRoot>
  );
};
AboutEvents.PropTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.array,
  setModal: PropTypes.func,
};
AboutMaster.PropTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.array,
  setModal: PropTypes.func,
};
AboutProduct.PropTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.array,
  setModal: PropTypes.func,
};

export { AboutMaster, AboutProduct, AboutEvents };
