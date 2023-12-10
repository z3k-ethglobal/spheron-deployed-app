import type { NextPage } from "next";
import axios from 'axios';
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "../components/MetaHeader";

import React, { useState } from 'react';

const Home: NextPage = () => {
  const [selectedFileName, setSelectedFileName] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const upload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile as Blob);
    axios.post('http://localhost:8080/upload', formData
    ).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">

        <div className="rounded-3xl flex-grow bg-base-300 w-half mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
          <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
            <input type="file" onChange={(event) => {
              const file = event.target.files?.item(0);
              if (file) {
                console.log(file);
                setSelectedFile(file);
                setSelectedFileName(file.name);
              } else {
                console.log('No file selected');
              }
            }} />

            <p>Selected file: {selectedFileName}</p>
            <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
            <button type="button" onClick={upload}>Upload</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
