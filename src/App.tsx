import { useState, useEffect } from "react";
import {
  Footer,
  Wrapper,
  Container,
  Header,
  Title,
  Search,
  Button,
  Main,
  List,
  DailyList,
  HourlyList,
} from "./components/content";

function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  const fetchLatLong = async () => {
    const response = await fetch("https://ipapi.co/json/");
    const result = await response.json();
    setLat(result.latitude);
    setLong(result.longitude);
  };

  useEffect(() => {
    fetchLatLong();
  }, []);

  useEffect(() => {
    console.log(lat);
    console.log(long);
  }, [lat, long]);

  return (
    <>
      <Wrapper>
        <Container>
          <Header />
          <Title />
          <Search />
          <Button />
          <Main />
          <List />
          <DailyList />
          <HourlyList />
        </Container>
        <Footer />
      </Wrapper>
    </>
  );
}

export default App;
