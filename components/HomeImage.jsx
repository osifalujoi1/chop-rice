import styles from "@/styles/components/HomeImage.module.scss"

function HomeImage() {
    return(
        <section className={styles.container} id="home">
            <img
                src="/images/home-image.jpg" 
                alt="Delicious Dish" 
                className={styles.image}
            />
        </section>
    );
}

export default HomeImage;