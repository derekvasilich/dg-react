import Image from 'next/image'
import Carousel from 'react-bootstrap/Carousel'

export default function DGCarousel({ images }) {

    const carouselItems = images.map((image, index) => 
        <Carousel.Item key={ index } className={ `carousel-item${index ? '' : ' active'}` }>
            <Image className="d-block w-100"
                        src={image.url}
                        width={image.width}
                        height={image.height}
                        alt={image.alt} />    
        </Carousel.Item>
    )

    return (
        <Carousel variant="dark">
            { carouselItems }
        </Carousel>
    )

}