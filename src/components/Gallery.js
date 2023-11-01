import React, { useState } from "react";
import data from "../data/Data";
export default function Gallery() {
	const [images, setImages] = useState(data);
	const [checkboxValues, setCheckboxValues] = useState({});
	const [draggedImage, setDraggedImage] = useState(null);

	const deleteSelectedImage = () => {
		const newImages = images.filter((image) => !checkboxValues[image.id]);
		setImages(newImages);
		setCheckboxValues({});
	};

	const handleCheckboxChange = (imageId, isChecked) => {
		setCheckboxValues((prevValues) => ({
			...prevValues,
			[imageId]: isChecked,
		}));
	};

	const handleDragStart = (e, id) => {
		setDraggedImage(id);
	};
	/**
	 * Handle the drop event for a draggable image.
	 *
	 * @param {Event} e - The drop event object.
	 * @param {string} id - The unique identifier of the target image where the dragged image is dropped.
	 */
	const handleDrop = (e, id) => {
		if (draggedImage !== null && draggedImage !== id) {
			// Create a copy of the images array
			const newImages = images.slice();

			// Find the index of the dragged image in the newImages array
			const draggedImageIndex = newImages.findIndex(
				(image) => image.id === draggedImage
			);

			// Find the index of the target image in the newImages array
			const targetImageIndex = newImages.findIndex((image) => image.id === id);

			if (draggedImageIndex !== -1 && targetImageIndex !== -1) {
				// Swap the positions of the dragged image and the target image in the newImages array
				[newImages[draggedImageIndex], newImages[targetImageIndex]] = [
					newImages[targetImageIndex],
					newImages[draggedImageIndex],
				];

				// Update the state with the newImages array
				setImages(newImages);

				// Optionally, you can set a property on the target image like this:
				// newImages[targetImageIndex].isDropable = true;
			}
		}
	};

	const countSelectedCheckboxes = Object.values(checkboxValues).filter(
		(isChecked) => isChecked
	).length;

	console.log(countSelectedCheckboxes);

	return (
		<div className="bg-gray-100 min-h-screen p-4">
			<div className="flex h-12 items-center justify-between mb-4">
				<h1
					className={`text-2xl font-bold ${
						countSelectedCheckboxes == 0 && "gradient-text text-3xl "
					}`}>
					{countSelectedCheckboxes > 1
						? `${countSelectedCheckboxes} Files Selected`
						: countSelectedCheckboxes == 1
						? `${countSelectedCheckboxes} File Selected`
						: "Gallery"}
				</h1>

				<button
					onClick={deleteSelectedImage}
					className="text-xl font-bold text-red-500 hover:underline hover:scale-110 transition-all duration-500">
					{countSelectedCheckboxes > 1
						? `Delete Files`
						: countSelectedCheckboxes == 1
						? `Delete File`
						: ""}
				</button>
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
				{images.map((image, index) => (
					<div
						key={image.id}
						className={`group p-2 relative bg-white rounded-lg border  hover:opacity-60 hover:scale-105 transition-transform cursor-pointer duration-300 ${
							index == 0
								? "border-4 border-orange-300 col-span-2 row-span-2"
								: ""
						} ${image.isSelected ? "bg-gray-300" : ""}} ${
							image.id === draggedImage ? "image-dragged" : ""
						}'`}
						onDragStart={(e) => handleDragStart(e, image.id)}
						onDrop={(e) => handleDrop(e, image.id)}
						onDragOver={(e) => e.preventDefault()}>
						<input
							type="checkbox"
							onChange={(e) => handleCheckboxChange(image.id, e.target.checked)}
							className={`absolute h-[10%] w-[10%] top-5 left-5 z-20 ${
								checkboxValues[image.id] ? "opacity-100" : "opacity-0"
							} group-hover:opacity-100 cursor-pointer transition-opacity duration-300`}
						/>

						<img
							src={image.src}
							alt={`Image ${image.id}`}
							className={`max-w-full mx-auto transition-all duration-300 ease-in-out transform`}
						/>
					</div>
				))}
				<label
					className={`h-full w-full rounded-lg flex flex-col space-y-5 items-center justify-center border-2 border-dashed border-slate-400 transition-all transform hover:scale-105 focus:scale-105 active:scale-95`}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
						/>
					</svg>
					<input type="file" className="hidden" accept="image/*" />
					<h1>Add Image</h1>
				</label>
			</div>
		</div>
	);
}
