
import '../styles/App.css';
import '../modules/header'
import Header from '../modules/header';
import Slider from '../modules/Slider';
import Footer from '../modules/footer';



function MainPage() {
  const images = [
    'https://www.dereknielsen.com/wp-content/uploads/2024/02/Stunning-display-900x600.jpg',
    'https://roll-club.kh.ua/wp-content/uploads/2023/11/azian-stail-900h600-900x600.jpg',
    'https://bigcedar.com/wp-content/uploads/2024/12/cliffhangers-pond-2000-900x600.jpg',
  ];
  return (
  <div>
    <Header/>
    <Slider images={images}/>
    <Footer/>
  </div>
  );
}

export default MainPage;
