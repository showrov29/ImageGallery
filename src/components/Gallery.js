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

	const countSelectedCheckboxes = Object.values(checkboxValues).filter(
		(isChecked) => isChecked
	).length;

	console.log(countSelectedCheckboxes);

	return (
		<div className="bg-gray-100 min-h-screen p-4">
			<div className="flex items-center justify-between mb-4">
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
						} ${image.isSelected ? "bg-gray-300" : ""}`}
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
