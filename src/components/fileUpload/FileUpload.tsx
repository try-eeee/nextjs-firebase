/* eslint-disable @next/next/no-img-element */
"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import styles from "./FileUpload.module.scss";
import { Button } from "../button/Button";
import { FaTimes } from "react-icons/fa";

interface FileUploadProps {
  setFile: Dispatch<SetStateAction<File | null>>;
  handleUploadImage: () => void;
  handleRemoved: () => void;
}

export function FileUpload(props: FileUploadProps) {
  const { setFile, handleUploadImage, handleRemoved } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileAdd = () => {
    fileInputRef.current!.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      const file = files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      e.target.value = "";
      setFile(file);
      handleUploadImage();
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    handleRemoved();
  };

  return (
    <>
      {previewUrl ? (
        <div className={styles.previewContainer}>
          <img src={previewUrl} alt="Preview" className={styles.preview} />
          <button onClick={handleRemoveImage} className={styles.closeButton}>
            <FaTimes />
          </button>
        </div>
      ) : (
        <label htmlFor="fileInput">
          <Button onClick={handleFileAdd}>画像をアップロード</Button>
          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            accept="image/*"
            className={styles.inputHidden}
            onChange={handleFileChange}
          />
        </label>
      )}
    </>
  );
}
