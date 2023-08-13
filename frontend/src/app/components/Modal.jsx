import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Modal from "react-modal";
import close_icon from "../../../public/assets/icons/closeorange-icon.svg";
import { generateRandomBy } from "../utilities/helpers";

const App = () => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newStoryText, setNewStoryText] = useState(""); // State for new story text
  const [newStoryTitle, setNewStoryTitle] = useState(""); // State for new story title
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("job");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (newStoryText && newStoryTitle) {
      setIsLoading(true);

      const requestData = {
        item_type: selectedOption,
        by: generateRandomBy(),
        text: newStoryText,
        title: newStoryTitle,
      };

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/news/create/",
          requestData
        );

        setNewStoryText("");
        setNewStoryTitle("");
        router.push("/");
      } catch (error) {
        console.error("Error creating story:", error);
      }

      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={openModal}>
        <input
          type="text"
          placeholder="Post"
          className="block w-full p-2 border rounded"
          value={newStoryTitle}
          onChange={(e) => setNewStoryTitle(e.target.value)}
        />
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="bg-transparent"
      >
        <div className="  h-[100vh] grid place-content-center">
          <div className="lg:w-[600px] bg-white pb-9 px-5 shadow-md border border-2-black rounded-sm">
            <div className="flex justify-end mt-2 mb-9">
              <img
                onClick={closeModal}
                src={close_icon.src}
                alt="close"
                className="w-6 h-6 mt-1 cursor-pointer"
              />
            </div>
            <form
              className="flex  flex-col space-y-4"
              onSubmit={handlePostSubmit}
            >
              <select
                className="border border-gray-200 px-4 py-2 rounded w-full"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="job">Job</option>
                <option value="story">Story</option>
              </select>

              <input
                type="text"
                placeholder="Title"
                className="block w-full p-2 border rounded"
                value={newStoryTitle}
                onChange={(e) => setNewStoryTitle(e.target.value)}
              />
              <textarea
                placeholder="What's happening?"
                className="block w-full p-2 border rounded"
                value={newStoryText}
                onChange={(e) => setNewStoryText(e.target.value)}
              />
              <button
                type="submit"
                className={`ml-auto bg-orange-500 ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-500"
                } text-white py-2 px-4 rounded`}
                disabled={isLoading}
              >
                {isLoading ? "Posting..." : "Post"}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
