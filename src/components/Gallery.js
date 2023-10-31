import React, { useState } from "react";
import data from "../data/Data";
export default function Gallery() {
	const [images, setImages] = useState(data);
	const [checkboxValues, setCheckboxValues] = useState({});
	const [draggedImage, setDraggedImage] = useState(null);

	const handleCheckboxChange = (imageId, isChecked) => {
		setCheckboxValues((prevValues) => ({
			...prevValues,
			[imageId]: isChecked,
		}));
	};

	const handleDragStart = (e, id) => {
		setDraggedImage(id);
	};
	const handleDrop = (e, id) => {
		if (draggedImage !== null && draggedImage !== id) {
			const newImages = images.slice(); // Create a copy of the images array
			const draggedImageIndex = newImages.findIndex(
				(image) => image.id === draggedImage
			);
			const targetImageIndex = newImages.findIndex((image) => image.id === id);

			if (draggedImageIndex !== -1 && targetImageIndex !== -1) {
				// Swap the positions of the dragged image and the target image
				[newImages[draggedImageIndex], newImages[targetImageIndex]] = [
					newImages[targetImageIndex],
					newImages[draggedImageIndex],
				];

				setImages(newImages);
			}
		}

		setDraggedImage(null);
	};

	console.log(checkboxValues);

	return (
		<div className="bg-gray-100 min-h-screen p-4">
			<h1 className="text-2xl mb-4">Gallery</h1>
			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
				{images.map((image, index) => (
					<div
						key={image.id}
						className={`group p-2 relative bg-white rounded-lg border transition-opacity hover:opacity-30  duration-300 cursor-pointer ${
							index == 0 ? "border-4 border-blue-500 col-span-2 row-span-2" : ""
						} ${image.isSelected ? "bg-gray-300" : ""}`}
						onDragStart={(e) => handleDragStart(e, image.id)}
						onDrop={(e) => handleDrop(e, image.id)}
						onDragOver={(e) => e.preventDefault()}>
						<input
							type="checkbox"
							onChange={(e) => handleCheckboxChange(image.id, e.target.checked)}
							className="absolute h-[10%] w-[10%] top-5 left-5 z-50 opacity-0 group-hover:opacity-100"
						/>

						<img
							src={image.src}
							alt={`Image ${image.id}`}
							className={`max-w-full mx-auto transition-all duration-300 ease-in-out transform ${
								image.id === draggedImage ? "scale-110" : "scale-90"
							}`}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
