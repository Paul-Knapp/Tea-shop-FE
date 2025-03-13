import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SubscriptionDetails.css';
import NavBar from '../NavBar/NavBar';

function SubscriptionDetails() {
    const [subscription, setSubscription] = useState(null);
    const { subscriptionId } = useParams();
    const [message, setMessage] = useState("Loading...");
    const [customer, setCustomer] = useState(null);
    const [teas, setTeas] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/subscriptions/${subscriptionId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setSubscription(data.data);

                const customerId = data.data.relationships.customer.data.id;
                const foundCustomer = data.included.find(
                    (item) => item.id === customerId && item.type === "customer"
                )?.attributes;
                setCustomer(foundCustomer);

                const teaList = data.included
                    .filter((item) => item.type === "tea")
                    .map((tea) => tea.attributes);
                setTeas(teaList);
            })
            .catch(() => {
                setMessage("There was an error fetching data. Please try again.");
            });
    }, [subscriptionId]);

    function cancelSubscription() {
        fetch(`http://localhost:3000/api/v1/subscriptions/${subscriptionId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: "cancelled",
            }),
        });
    }

    return (
        <div className='subscription-details-page'>
            {subscription ? (
                <section>
                    <section className='subscription-details'>
                        <NavBar />
                        <img src={subscription.attributes.image_url} alt={subscription.attributes.title} />
                        <h1>{subscription.attributes.title}</h1>
                        <p>{subscription.attributes.price}</p>
                        <p>{subscription.attributes.frequency}</p>
                        <p>{subscription.attributes.description}</p>
                        <p>{subscription.attributes.status}</p>
                        <button onClick={cancelSubscription}>Cancel Subscription</button>
                    </section>
                    <section className='customer-information'>
                        <h2>Customer Information</h2>
                        {customer ? (
                            <>
                                <p>{customer.first_name} {customer.last_name}</p>
                                <p>{customer.email}</p>
                                <p>{customer.address}</p>
                            </>
                        ) : (
                            <p>Loading customer information...</p>
                        )}
                    </section>
                    <section className='tea-list'>
                        <h2>Teas</h2>
                        {teas.length > 0 ? (
                            <ul>
                                {teas.map((tea) => (
                                    <li>
                                        <h3>Tea Name {tea.title}</h3>
                                        <p>{tea.description}</p>
                                        <p>Brew Temperature: {tea.temperature}°F</p>
                                        <p>Brew Time: {tea.brew_time} minutes</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No teas found for this subscription.</p>
                        )}
                    </section>
                </section>
            ) : (
                <p>{message}</p>
            )}
        </div>
    );
}

export default SubscriptionDetails;
