import Hero from '../components/Hero';
import Services from '../components/Services';
import Services2 from '../components/Services2';
import Featured from '../components/Featured';
import GraphicsShowcase from '../components/GraphicsShowcase';
import Impact from '../components/Impact';

const Home = () => {
    return (
        <main>
            <Hero />
            {/* <Services /> */}
            <Services2 />
            <Featured />
            {/* <GraphicsShowcase /> */}
            <Impact />
        </main>
    );
};

export default Home;
