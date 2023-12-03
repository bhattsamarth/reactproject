// BuyDatasetPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './BuyDatasetPage.module.css';

const BuyDatasetPage = () => {
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
    // Implement logic to check the accuracy of the selected dataset
    // This can include navigating to a separate accuracy check page
    // or showing a pop-up/modal for accuracy verification
    console.log(`Checking accuracy for dataset: ${selectedDataset.name}`);
    // Close the payment modal after accuracy check
    closePaymentModal();
  };


  const YourComponent = ({ userBlockchainAddress, datasetName, datasetDescription, datasetPrice }) => {
    const handlePaymentAction = async (action) => {
      try {
        // Your payment handling logic
        console.log(`Performing ${action} for user: ${userBlockchainAddress}`);

        // Call handlePayment with the dataset information
        await handlePayment(userBlockchainAddress, datasetName, datasetDescription, datasetPrice);
      } catch (error) {
        console.error('Error handling payment:', error);
        // Handle errors or show user-friendly messages
      }
    };

    const handlePayment = async (userBlockchainAddress, name, description, price) => {
      try {
        // Call listData with the user's blockchain address and dataset information
        await listData(userBlockchainAddress, name, description, price);

        // Additional logic after successful payment, if needed
      } catch (error) {
        console.error('Error handling payment:', error);
      }
    };

    // Function to list data
    async function listData(userBlockchainAddress, name, description, price) {
      try {
        // Call the contract method to list data
        const transaction = dataMarketplaceContract.methods.listData(name, description, price).send({
          from: userBlockchainAddress,
          gas: 2000000, // Adjust gas limit as needed
        });

        // Wait for the transaction to be mined
        const receipt = await transaction;
        console.log('Data listed successfully:', receipt);

        // Display receipt information on the page
        const receiptInfoDiv = document.getElementById('receiptInfo');

        // Generate HTML to display all attributes of the receipt
        let receiptInfoHTML = '<h3>Transaction Receipt:</h3>';
        for (const key in receipt) {
          receiptInfoHTML += `<p><strong>${key}:</strong> ${receipt[key]}</p>`;
        }

        // Update the receiptInfoDiv with the generated HTML
        receiptInfoDiv.innerHTML = receiptInfoHTML;
      } catch (error) {
        console.error('Error listing data:', error);
      }
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
          <button onClick={() => handlePaymentAction('pay')}>Pay</button>
          <button onClick={closePaymentModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default BuyDatasetPage;





