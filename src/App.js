import React from "react";
import "./styles.css";

const EnterKeyHolder = ({ children, buttonTarget, onRender }) => {
  const myRef = React.createRef();

  const callBack = (event) => {
    if (
      myRef.current &&
      myRef.current.contains(event.target) &&
      event.keyCode === 13
    ) {
      if (buttonTarget) {
        myRef.current.querySelector(buttonTarget).click();
      } else {
        myRef.current.querySelector("button").click();
      }
    }
  };

  React.useEffect(() => {
    if (myRef.current) {
      window.addEventListener("keypress", callBack);
    }
    return () => {
      window.removeEventListener("keypress", callBack);
    };
  }, [myRef]);

  return onRender && onRender(myRef);
};

const Form2 = ({ containerRef }) => {
  return (
    <div className="margin-top-20" ref={containerRef}>
      Name:- <input type="text" />
      password:- <input type="password" />
      <button
        data-enter
        onClick={() => {
          alert("clicked");
        }}
      >
        Click me
      </button>
      <button>do not active me on enter</button>
    </div>
  );
};

const Form1 = ({ containerRef }) => {
  return (
    <div className="margin-top-20" ref={containerRef}>
      Name:- <input type="text" />
      password:- <input type="password" />
      <button
        onClick={() => {
          alert("clicked");
        }}
      >
        Click me
      </button>
    </div>
  );
};

export default function App() {
  const [formName, changeForm] = React.useState("form1");

  console.log(formName);
  return (
    <div className="App">
      <select onChange={(e) => changeForm(e.target.value)}>
        <option value="form1">single action button</option>
        <option value="form2">multiple action button</option>
      </select>

      {formName === "form1" ? (
        <EnterKeyHolder onRender={(ref) => <Form1 containerRef={ref} />} />
      ) : (
        <EnterKeyHolder
          buttonTarget="button[data-enter]"
          onRender={(ref) => <Form2 containerRef={ref} />}
        />
      )}
    </div>
  );
}
