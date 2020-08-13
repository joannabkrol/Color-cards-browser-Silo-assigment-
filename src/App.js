import React, { useState, useEffect } from "react";
import "./App.css";

/*

Consume the following GET endpoint:
https://reqres.in/api/unknown?per_page=12
It will return a JSON object. The data property of that object is an array of colors. 

Using React:

- Fetch that endpoint.
- Render cards in the screen with each color. Each card should at least have the name of the color. The cards (or part of the card's background) should have a background color representing itself (you can use the HEX value). Have fun with it, get as creative as you want. 
- Make it so that using only CSS, hovering on each card will make them zoom without shifting or moving any adjacent cards.
- Finally, implement it so that clicking on any card will open a lightbox modal in the center of the page, displaying any more details you want about that color. Clicking outside of the lightbox should close it.
- If at any point during the exercise you want to break the spec above to get really creative and implement something you really like, please do so. 

The solution has to use React and only functional components and hooks, no classes.

- To submit, simply fork this codepen, implement your solution and send it to us via LinkedIn or via email to antonio@usesilo.com.

*/

const App = () => {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentColor, setColor] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://reqres.in/api/unknown?per_page=12");
      res
        .json()
        .then((res) => {
          setItems(res);
        })
        .catch((err) => {
          setError(err);
        });
    }

    fetchData();
  }, []);
  let cards = items.data ? items.data : [];

  const openModal = (colorName) => {
    setModal(true);
    setColor(colorName);
  };
  const closeModal = () => {
    setModal(false);
    setColor("");
  };
  const backdrop = <div className="backdrop" onClick={closeModal}></div>;
  let cardModal = (
    <>
      <div className="modal">
        {cards
          .filter((card) => card.name == currentColor)
          .map((c) => (
            <>
              <div
                className="modal_colorBox"
                style={{
                  background: c.color,
                }}
              ></div>
              <div style={{ border: "1px solid lightgrey" }}>
                <p>Name: {c.name}</p>
                <p>Year: {c.year}</p>
                <p>Color: {c.color}</p>
                <p>Pantone: {c.pantone_value}</p>
              </div>
            </>
          ))}
      </div>
      {backdrop}
    </>
  );

  console.log(cards);
  return (
    <div>
      {modal ? cardModal : null}
      <div className="cards">
        {cards.map((card) => (
          <div
            className="card"
            key={card.id}
            onClick={() => openModal(card.name)}
          >
            <div
              style={{ backgroundColor: card.color }}
              className="colorBox"
            ></div>
            <p>{card.name}</p>
          </div>
        ))}
      </div>

      {error ? <span>Has error: {JSON.stringify(error)}</span> : null}
    </div>
  );
};

export default App;
