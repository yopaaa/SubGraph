"use client"

import React, { useEffect, useState } from 'react';
import styles from './BackgroundSelector.module.css';
import images from '../../../data/background.json'

async function cacheImage(url) {
  const cached = localStorage.getItem(`imgCache:${url}`);
  if (cached) return cached;

  const response = await fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();

  return new Promise((resolve) => {
    reader.onloadend = () => {
      const base64 = reader.result;
      try {
        localStorage.setItem(`imgCache:${url}`, base64);
      } catch {
        console.warn("localStorage penuh, cache dilewati");
      }
      resolve(base64);
    };
    reader.readAsDataURL(blob);
  });
}

async function loadImage() {
  const savedImage = localStorage.getItem('backgroundImage');
  if (savedImage) {
    document.body.style.backgroundImage = `url(${savedImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    return savedImage;
  }

  const base64 = await cacheImage(images[4]);

  // onChange(base64);
  // setSelectedImage(images[5]);

  document.body.style.backgroundImage = `url(${base64})`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';

  localStorage.setItem('backgroundImage', base64);

}


export function LoadImageComponent(params) {
  useEffect(() => {
    loadImage()
  }, []);

  return <></>
}

const BackgroundSelector = ({ onClose, onChange }) => {
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    setSelectedImage(loadImage())
  }, []);

  const handleSelect = async (img) => {
    const base64 = await cacheImage(img);

    // onChange(base64);/
    setSelectedImage(img);

    document.body.style.backgroundImage = `url(${base64})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';

    localStorage.setItem('backgroundImage', base64);
  };


  return (
    <div className={styles.rootContainer}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <h2 className={styles.title}>Pilih Background</h2>
          <button type="button" onClick={onClose}>Close</button>
        </div>
        <div className={styles.grid}>
          {images.map((img, index) => (
            <div
              key={index}
              className={`${styles.imageBox} ${selectedImage === img ? styles.active : ''}`}
              onClick={() => handleSelect(img)}
            >
              <img src={img} alt={`Background ${index}`} height={200} width={200} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundSelector;