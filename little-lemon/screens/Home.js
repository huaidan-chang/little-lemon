import React, {useState} from 'react';
import { View } from 'react-native';
import Hero from '../component/Hero';
import MenuList from '../component/MenuList';
import CategoryList from '../component/CategoryList';
import { debounce } from 'lodash';

const Home = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = debounce((query) => {
      setSearchQuery(query);
    }, 500);

    return (
        <View style={{ flex: 1 }}>
            <Hero onSearch={handleSearch} showSearch={true} />
            <CategoryList selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
            <MenuList selectedCategories={selectedCategories} searchQuery={searchQuery}/>
        </View>
    );
};

export default Home;
