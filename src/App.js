import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import View from "@vkontakte/vkui/dist/components/View/View";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import "@vkontakte/vkui/dist/vkui.css";
import {
  PanelHeader,
  Epic,
  TabbarItem,
  Tabbar,
  Panel,
  Title,
  Group,
  Card,
  CardGrid,
} from "@vkontakte/vkui";
import Icon28HomeOutline from "@vkontakte/icons/dist/28/home_outline";
import Streams from "./panels/Streams";
import Articles from "./panels/Articles";
import Events from "./panels/Events";
import Places from "./panels/Places";

import { getData } from "./components/Requests";
import {
  Icon28CameraOutline,
  Icon28EmployeeOutline,
  Icon28Game,
  Icon28GameOutline,
  Icon28LocationOutline,
  Icon28MarketOutline,
} from "@vkontakte/icons";
import Products from "./panels/Products";
import Masters from "./panels/Masters";

const App = () => {
  const [fetchedUser, setUser] = useState(null);
  const [modal, setModalPage] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
  const [state, setState] = useState("products");
  const [streams, setStreams] = useState([]);
  const [events, setEvents] = useState([]);
  const [articles, setArticles] = useState([]);
  const [places, setPlaces] = useState([]);
  const [products, setProducts] = useState([]);
  const [masters, setMasters] = useState([]);

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    async function fetchData() {
      setPopout(<ScreenSpinner size="large" />);
      const user = await bridge.send("VKWebAppGetUserInfo");
      if (state === "articles")
        setArticles(await getData("articles"));
      if (state === "streams")
        setStreams(await getData("streams"));
      if (state === "events")
        setEvents(await getData("events"));
      if (state === "places")
        setPlaces(await getData("places"));
      if (state === "products")
        setProducts(await getData("products"));
      if (state === "masters")
        setMasters(await getData("masters"));
      setPopout(null);
    }
    fetchData();
  }, [state]);

  const onStoryChange = (e) => {
    setState(e.currentTarget.dataset.story);
  };

  return (
    <Epic
      activeStory={state}
      tabbar={
        <Tabbar>
          <TabbarItem
            onClick={onStoryChange}
            selected={state === "products"}
            data-story="products"
            text="Изделия"
          >
            <Icon28MarketOutline />
          </TabbarItem>
          <TabbarItem
            onClick={onStoryChange}
            selected={state === "masters"}
            data-story="masters"
            text="Мастера"
          >
            <Icon28EmployeeOutline />
          </TabbarItem>
          <TabbarItem
            onClick={onStoryChange}
            selected={state === "events"}
            data-story="events"
            text="Мероприятия"
          >
            <Icon28GameOutline />
          </TabbarItem>
          <TabbarItem
            onClick={onStoryChange}
            selected={state === "places"}
            data-story="places"
            text="Места"
          >
            <Icon28LocationOutline />
          </TabbarItem>
          <TabbarItem
            onClick={onStoryChange}
            selected={state === "streams"}
            data-story="streams"
            text="Стримы"
          >
            <Icon28CameraOutline />
          </TabbarItem>
        </Tabbar>
      }
    >
      <View popout={popout} id="products" activePanel="products" modal={modal}>
        <Products id={"products"} setModal={setModalPage} products={products} modal={modal} />
      </View>
      <View popout={popout} id="masters" activePanel="masters" modal={modal}>
        <Masters id={"masters"} setModal={setModalPage} masters={masters} modal={modal} />
      </View>
      <View popout={popout} id="streams" activePanel="streams" modal={modal}>
        <Streams id="streams" setModal={setModalPage} streams={streams} />
      </View>
      <View popout={popout} id="places" activePanel="places" modal={modal}>
        <Places id="places" setModal={setModalPage} places={places} />
      </View>
      <View popout={popout} id="articles" activePanel="articles" modal={modal}>
        <Articles id="articles" setModal={setModalPage} articles={articles} />
      </View>
      <View popout={popout} id="events" activePanel="events" modal={modal}>
        <Events id="events" setModal={setModalPage} events={events} />
      </View>
    </Epic>
  );
};

export default App;
