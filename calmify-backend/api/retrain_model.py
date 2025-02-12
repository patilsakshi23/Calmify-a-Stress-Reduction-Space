import os
import pickle
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Conv1D, GlobalMaxPooling1D, Dense
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Paths to files
MODEL_PATH = 'text_model/Text_Prediction_Model.keras'
TOKENIZER_PATH = 'text_model/tokenizer_stress.pkl'
TEXT_DATASET = 'text_model/text_dataset.csv'
MAX_LEN = 100  # Max length used during training

def load_original_dataset():
    data = pd.read_csv(TEXT_DATASET)
    original_texts = data['text'].astype(str)
    original_labels = data['label'].astype(int)
    return data, original_texts, original_labels

def retrain_model():
    # Load the dataset
    data, original_texts, original_labels = load_original_dataset()

    # Remove duplicates from the dataset based on text and label columns
    data_cleaned = data.drop_duplicates(subset=['text', 'label'], keep='first')
    data_cleaned.to_csv(TEXT_DATASET, index=False)  # Save the cleaned dataset

    # Reload the cleaned dataset
    original_texts, original_labels = data_cleaned['text'].astype(str), data_cleaned['label'].astype(int)

    # Load tokenizer
    with open(TOKENIZER_PATH, 'rb') as file:
        text_tokenizer = pickle.load(file)

    print("Tokenizing and padding combined texts...")
    combined_sequences = text_tokenizer.texts_to_sequences(original_texts)
    combined_padded = pad_sequences(combined_sequences, maxlen=MAX_LEN)
    combined_labels = np.array(original_labels)

    # Split into training and validation sets
    X_train, X_val, y_train, y_val = train_test_split(combined_padded, combined_labels, test_size=0.2, random_state=42)

    print("Building and training the model...")
    # Build a new model (same as the original architecture)
    model = Sequential()
    model.add(Embedding(input_dim=5000, output_dim=100, input_length=MAX_LEN))
    model.add(Conv1D(filters=128, kernel_size=5, activation='relu'))
    model.add(GlobalMaxPooling1D())
    model.add(Dense(10, activation='relu'))
    model.add(Dense(1, activation='sigmoid'))

    # Compile the model
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

    # Retrain the model
    model.fit(X_train, y_train, epochs=5, batch_size=32, validation_data=(X_val, y_val))

    print("Saving the retrained model...")
    # Save the retrained model
    model.save(MODEL_PATH)
    return "Model retrained successfully"
