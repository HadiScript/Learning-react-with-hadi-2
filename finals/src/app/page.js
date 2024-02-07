const fetchingData = async () => {
  console.log("am here");
  if (typeof window === "undefined") {
    console.log("am here is SSR");
  }

  return { name: "hadi" };
};

const LandingPage = async () => {
  const { name } = await fetchingData();

  return <div>LandingPage - {name}</div>;
};

export default LandingPage;
