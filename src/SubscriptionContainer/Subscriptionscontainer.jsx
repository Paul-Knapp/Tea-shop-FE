import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SubscriptionsContainer.css";

function SubscriptionsContainer() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [message, setMessage] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false); // Toggle filter state

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

  const filteredSubscriptions = showActiveOnly
    ? subscriptions.filter((sub) => sub.attributes.status !== "cancelled")
    : subscriptions;

  return (
    <section className="subscriptions-container">
      {message && <p className="error-message">{message}</p>}
      <button onClick={() => setShowActiveOnly((prev) => !prev)}>
        {showActiveOnly ? "Show All" : "Hide Canceled"}
      </button>

      {filteredSubscriptions.length > 0 ? (
        filteredSubscriptions.map((subscription) => (
          <Link to={`/subscription/${subscription.id}`} key={subscription.id} className="subscription-link">
            <div className="subscription">
              <h1>{subscription.attributes.title}</h1>
              <p>Price: ${subscription.attributes.price}</p>
              <p>Frequency: {subscription.attributes.frequency}</p>
              <p>Status: {subscription.attributes.status}</p>
            </div>
          </Link>
        ))
      ) : (
        !message && <p>No subscriptions available.</p>
      )}
    </section>
  );
}

export default SubscriptionsContainer;


