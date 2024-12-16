import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BookDetails from './components/BookDetails';
import AddEditBook from './components/AddEditBook';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/add" element={<AddEditBook />} />
                <Route path="/edit/:id" element={<AddEditBook />} />
            </Routes>
        </Router>
    );
}

export default App;
