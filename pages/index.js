import Header from "./Global/Header";
import Body from "./Content/Body";
import Script from "next/script";
import axios from "axios";
axios.defaults.headers = {
  "Content-Type": "application/json",
  "Access-Control-Request-Headers": "*",
  "api-key": "ewAPnOVjegDeDJT75buYtiXCrGQJbyLcDhIhATkKTLm9KdlPqhAfCfl9gyxcOXZ5",
};
axios.defaults.baseURL =
  "https://data.mongodb-api.com/app/data-oyxty/endpoint/data/beta";
const dbConfig = {
  collection: "pages",
  database: "pages",
  dataSource: "Cluster0",
};

export default function Home({ pages }) {
  return (
    <>
      <div>
        <Header />
        <div>
          {pages.length === 0 ? (
            <h2>No Pages Added</h2>
          ) : (
            <>
              {pages.map((post, i) => (
                <div key={i}>
                  <Body data={post} />
                </div>
              ))}
            </>
          )}
        </div>
        <Script
          src="/tinymce/tinymce.min.js"
          strategy="beforeInteractive"
          onError={(e) => {
            console.error("Script failed to load", e);
          }}
        />
      </div>
    </>
  );
}

export async function getStaticProps() {
  let data = await axios.post("/action/find", JSON.stringify(dbConfig));
  return {
    props: {
      pages: data.data.documents,
    },
  };
}
