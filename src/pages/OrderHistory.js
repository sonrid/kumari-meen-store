import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

const OrderHistory = ({ authUser }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    if (!authUser) {
      setLoading(false);
      return;
    }
    const q = query(
      collection(db, "orders"),
      where("userId", "==", authUser.uid),
      orderBy("date", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let ordersArr = [];
      querySnapshot.forEach((doc) => {
        ordersArr.push({ id: doc.id, ...doc.data() });
      });
      setOrders(ordersArr);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db, authUser]);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading your orders...</p>;
  }

  if (!loading && orders.length === 0) {
    return <p style={{ padding: "2rem" }}>No past orders found.</p>;
  }

  return (
    <div style={{
      maxWidth: "720px",
      margin: "2rem auto",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
      padding: "2rem"
    }}>
      <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>Your Order History</h2>
      {orders.map((order) => (
        <div key={order.id}
          style={{
            border: "1px solid #eee",
            marginBottom: "1.8rem",
            padding: "1rem",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Details - left */}
          <div style={{ flex: 2 }}>
            <p style={{ fontWeight: "bold" }}>
              Date: {order.date && order.date.toDate().toLocaleString()}
            </p>
            <p>
              <strong>Customer:</strong> {order.customer?.name} <br />
              <strong>Address:</strong> {order.customer?.address} <br />
              <strong>Phone:</strong> {order.customer?.phone}
            </p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {order.items.map((item, i) => (
                <li key={i} style={{ marginBottom: "0.5rem" }}>
                  <strong>{item.name}</strong> (Qty: {item.quantity}) - ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod} <br />
              <strong>Total:</strong> ₹{order.total}
            </p>
          </div>
          {/* All product images - right, vertical stacked */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            {order.items.map((item, i) => (
              <img
                key={i}
                src={item.img}
                alt={item.name}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "0.5rem",
                  border: "1px solid #eee"
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
