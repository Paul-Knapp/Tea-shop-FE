import { useState, useEffect } from "react";
import './Subscriptionscontainer.css';

function SubscriptionsContainer() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/subscriptions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setSubscriptions(data.data))
      .catch(() => {
        setMessage("There was an error fetching data. Please try again.");
      });
  }, []);

  return (
    <section className="subscriptions-container">
      {subscriptions.length > 0 ? (
        subscriptions.map((subscription) => (
          <div className="subscription" key={subscription.id}>
            <h1>{subscription.attributes.title}</h1>
            <p>Price: ${subscription.attributes.price}</p>
            <p>Frequency: {subscription.attributes.frequency}</p>
          </div>
        ))
      ) : (
        !message && <p>No subscriptions available.</p>
      )}
    </section>
  );
}

export default SubscriptionsContainer;


