import React, { useState } from 'react';
import './ProductForm.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const stateDescriptions = {
  bad: "Forte usure, déchirure visible, affaissement marqué, éléments cassés. 0 %. 'Désolé, votre produit ne rentre pas dans les critères de reprise.'",
  medium: "Usure visible, aucune déchirure, affaissement léger, aucune casse, tâche partielle, canapé fonctionnel. Prix de reprise estimé : 20% = 400 euros",
  good: "Légère usure, aucune déchirure, aucun affaissement, aucune casse, aucune tâche, canapé fonctionnel. Prix de reprise estimé : 40% = 800 euros",
  excellent: "Comme neuf, aucune usure visible, aucune déchirure, aucun affaissement, aucune casse, aucune tâche, canapé fonctionnel. Prix de reprise estimé : 60% = 1200 euros"
};

const getBuybackPrice = (state) => {
  switch(state) {
    case 'bad':
      return '0€';
    case 'medium':
      return '400€';
    case 'good':
      return '800€';
    case 'excellent':
      return '1 200€';
    default:
      return '-';
  }
};

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productName: 'Canapé 3 places - Lisboa',
    productState: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      productName: 'Canapé 3 places - Lisboa',
      productState: ''
    });
  };

  return (
    <div className="form-container">
      <h2>Revendez Votre Produit</h2>
      <div className="product-image">
        <img src="/images/product.png" alt="Canapé 3 places - Lisboa" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Nom du produit :</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value="Canapé 3 places - Lisboa"
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="initialPrice">Prix initial :</label>
          <input
            type="text"
            id="initialPrice"
            name="initialPrice"
            value="2 000€"
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="productState">État du produit :</label>
          <select
            id="productState"
            name="productState"
            value={formData.productState}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez l'état...</option>
            <option value="bad">Mauvais</option>
            <option value="medium">Moyen</option>
            <option value="good">Bon</option>
            <option value="excellent">Excellent</option>
          </select>
          {formData.productState && (
            <div className="state-description">
              {stateDescriptions[formData.productState]}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="buybackPrice">Prix de rachat :</label>
          <input
            type="text"
            id="buybackPrice"
            value={getBuybackPrice(formData.productState)}
            readOnly
            className="buyback-price"
          />
        </div>


        <div className="form-group disclaimer">
          <p>Le prix de rachat estimé est donné à titre indicatif et sera confirmé lors de votre dépôt en magasin</p>
        </div>

        {!formData.productState && (
          <div className="validation-message">
            Veuillez sélectionner l'état de votre produit
          </div>
        )}

        <button 
          type="submit" 
          disabled={!formData.productState}
          className={!formData.productState ? 'button-disabled' : ''}
        >
          Envoyer
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-inner">
          <h3>Merci pour votre demande !</h3>
          <p>Nous vous contacterons prochainement par email et SMS pour confirmer les détails.</p>
          <button onClick={closeModal}>Fermer</button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductForm;
