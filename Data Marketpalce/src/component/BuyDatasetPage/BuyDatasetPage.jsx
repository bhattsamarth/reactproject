// BuyDatasetPage.jsx
import React, { useState } from 'react';
import YourComponent from '../YourComponent/YourComponent'; // Adjust the path accordingly
import styles from './BuyDatasetPage.module.css';

const BuyDatasetPage = ({ userBlockchainAddress }) => {
  const [datasets, setDatasets] = useState([
    { id: 1, name: 'Dataset A', price: 10 },
    { id: 2, name: 'Dataset B', price: 15 },
    { id: 3, name: 'Dataset C', price: 20 },
  ]);

  const [selectedDataset, setSelectedDataset] = useState(null);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  const handleBuyClick = (dataset) => {
    setSelectedDataset(dataset);
    openPaymentModal();
  };

  const openPaymentModal = () => {
    setPaymentModalVisible(true);
  };

  const closePaymentModal = () => {
    setPaymentModalVisible(false);
  };

  const handleAccuracyCheck = () => {
    console.log(`Checking accuracy for dataset: ${selectedDataset.name}`);
    closePaymentModal();
  };

  return (
    <div className={styles.buyDatasetPage}>
      <h2>Available Datasets</h2>
      <ul className={styles.datasetList}>
        {datasets.map((dataset) => (
          <li key={dataset.id} className={styles.datasetItem}>
            <p>{dataset.name}</p>
            <p>${dataset.price}</p>
            <button onClick={() => handleBuyClick(dataset)} className={styles.buyButton}>
              Buy
            </button>
          </li>
        ))}
      </ul>

      {/* Payment Modal */}
      {paymentModalVisible && (
        <div className={styles.paymentModal}>
          <h3>Payment Gateway</h3>
          <p>Amount: ${selectedDataset?.price}</p>
          <button onClick={handleAccuracyCheck}>Check Accuracy</button>
          <YourComponent
            userBlockchainAddress={userBlockchainAddress} // Replace with the actual user's address
            datasetName={selectedDataset?.name}
            datasetDescription={`Description of ${selectedDataset?.name}`}
            datasetPrice={selectedDataset?.price}
          />
          <button onClick={closePaymentModal}>Close</button>
        </div>
      )}

      {/* Receipt Information */}
      <div id="receiptInfo"></div>
    </div>
  );
};

export default BuyDatasetPage;

