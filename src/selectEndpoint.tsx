import { Divider } from "@mui/material";
import { useState } from "react";

type endpoint = {
  lavel: string;
  type: string;
};

const endpoints: endpoint[] = [
  {
    lavel: "/upnode",
    type: "GET"
  },
  {
    lavel: "/add-upnode",
    type: "PATCH"
  },
  {
    lavel: "/add-link",
    type: "PATCH"
  },
  {
    lavel: "/nssai",
    type: "GET"
  },
  {
    lavel: "/ue-context",
    type: "GET"
  }
];

const batchColor: { [key: string]: string } = {
  GET: "#71C8E2",
  POST: "#71E275",
  PATCH: "#71E2BA",
  PUT: "E2D071",
  DELETE: "E23552"
};

const Endpoint = ({ endpoint }: { endpoint: endpoint }) => {
  console.log(endpoint);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "70px 1fr" }}>
      <span
        style={{
          padding: "0em 0.5em",
          background: `${batchColor[endpoint.type]}`,
          borderRadius: 10,
          color: "#fafafa"
        }}
      >
        {endpoint.type}
      </span>
      {endpoint.lavel}
    </div>
  );
};

const Selecter = ({ items, render }: { items: any[]; render: Function }) => {
  const [selected, selectIndex] = useState<number>(1);
  const [opend, open] = useState<boolean>(false);
  const menuOpen = () => {
    open(true);
  };
  const selectItem = (index: number) => {
    selectIndex(index);
    open(false);
  };
  return (
    <>
      {opend ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {items.map((item, index) => {
            return <div onClick={() => selectItem(index)}>{render(item)}</div>;
          })}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 50px",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {selected !== 0 && (
              <div
                style={{ opacity: 0.3, overflow: "hidden", height: "0.6em" }}
              >
                <div style={{ transform: "translateY(-1em)" }}>
                  {render(items[selected - 1])}
                </div>
              </div>
            )}
            <div>{render(items[selected])}</div>
            {selected !== items.length - 1 && (
              <div
                style={{ opacity: 0.3, overflow: "hidden", height: "0.5em" }}
              >
                {render(items[selected + 1])}
              </div>
            )}
          </div>
          <div>
            <button
              style={{ background: "#63E1FF", border: "none" }}
              onClick={menuOpen}
            >
              ▽
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const SelectEndpoint = () => {
  return (
    <div
      style={{
        width: "450px",
        border: "1px solid #63E1FF",
        padding: "5px 10px"
      }}
    >
      <div>test</div>
      <Divider />
      <Selecter
        items={endpoints}
        render={(endpoint: endpoint) => {
          return <Endpoint endpoint={endpoint} />;
        }}
      />
      <Divider />
    </div>
  );
};
