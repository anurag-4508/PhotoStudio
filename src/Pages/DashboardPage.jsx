




import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signOut } from '../firebase'; 
import styles from './Dashboard.module.css';  
const DashboardPage = ({ token }) => {
    const [imageFile, setImageFile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('prewedding');
    const [images, setImages] = useState({}); 
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            fetchAllImages(); 
        }
    }, [token, navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const fetchImagesByCategory = async (category) => {
        try {
            const response = await fetch(
                `https://enchanting-taiyaki-c89136.netlify.app/.netlify/functions/getImages?category=${category}`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching images for category ${category}:`, error);
            return [];
        }
    };

    const fetchAllImages = async () => {
        const categories = ['prewedding', 'engagement', 'wedding', 'birthday', 'familyandbaby'];
        const imagesByCategory = {};

        for (let category of categories) {
            const images = await fetchImagesByCategory(category);
            imagesByCategory[category] = images;
        }

        setImages(imagesByCategory);
    };


    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };


    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

   
    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'my_preset');
        formData.append('folder', selectedCategory);

        try {
            const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dtamfjqa4/image/upload', {
                method: 'POST',
                body: formData,
            });

            const cloudinaryData = await cloudinaryResponse.json();
            const imageUrl = cloudinaryData.secure_url;

            await fetch('https://enchanting-taiyaki-c89136.netlify.app/.netlify/functions/saveImage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: imageUrl, category: selectedCategory }),
            });

            alert('Image uploaded and URL saved to MongoDB');
            fetchAllImages();  // Refresh images after upload
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image');
        }
    };

 
    const handleDelete = async (imageId, cloudinaryId) => {
        try {
            await fetch(`https://enchanting-taiyaki-c89136.netlify.app/.netlify/functions/deleteImage`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageId, cloudinaryId }),
            });

            alert('Image deleted successfully');
            fetchAllImages();  // Refresh images after deletion
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <div className={styles.dashboard}>
            <nav className={styles.navbar}>
                <h1 className={styles.title}>Admin Dashboard</h1>
                <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </nav>

            
            <form onSubmit={handleUpload} className={styles.form}>
                <input type="file" onChange={handleFileChange} required className={styles.inputFile} />
                <select value={selectedCategory} onChange={handleCategoryChange} className={styles.selectCategory}>
                    <option value="prewedding">Prewedding</option>
                    <option value="engagement">Engagement</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday</option>
                    <option value="familyandbaby">Family and Baby</option>
                </select>
                <button type="submit" className={styles.uploadButton}>Upload Image</button>
            </form>

         
            <div className={styles.imageGallery}>
                {Object.keys(images).map((category) => (
                    <div key={category} className={styles.imageCategory}>
                        <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                        <div className={styles.imageGrid}>
                            {images[category].length > 0 ? (
                                images[category].map((image) => (
                                    <div key={image._id} className={styles.imageContainer}>
                                        <img src={image.url} alt={category} className={styles.image} />
                                        <button
                                            onClick={() => handleDelete(image._id, image.cloudinaryId)}
                                            className={styles.deleteButton}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No images found for this category.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;

