import React, { useRef, useState, useEffect } from 'react';
import Card from '../Components/Card';

function Home() {
    const [token] = useState(localStorage.getItem('token'));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const nameRef = useRef();
    const priceRef = useRef();
    const descRef = useRef();
    const formRef = useRef();

    useEffect(() => {
        fetch('https://auth-rg69.onrender.com/api/products/private/all', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setProducts(data);
        });
    }, [token]);

    function handeDelete(id) {
        let conf = confirm('ochirmoqchimisiz');
        if (conf) {
            fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.message === "Mahsulot muvaffaqiatli o'chirildi") {
                    setProducts(prev => prev.filter(product => product.id !== id));
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    function handleSave(event) {
        event.preventDefault();

        const create = {
            "name": nameRef.current.value,
            "description": descRef.current.value,
            "status": "active",
            "price": priceRef.current.value,
            "category_id": "2",
        };

        setLoading(true);
        fetch('https://auth-rg69.onrender.com/api/products/private', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(create)
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.id) {
                setProducts([...products, data]);
                formRef.current.reset();
            }
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="p-4">
            <form ref={formRef} className="mb-4 space-y-4">
                <input 
                    type="text" 
                    ref={nameRef}
                    placeholder='name...' 
                    className="border border-gray-300 p-2 rounded w-full" 
                />
                <input 
                    type="number" 
                    ref={priceRef}
                    placeholder='price...' 
                    className="border border-gray-300 p-2 rounded w-full" 
                />
                <textarea 
                    ref={descRef}
                    placeholder='description...' 
                    className="border border-gray-300 p-2 rounded w-full" 
                />
                <button 
                    onClick={handleSave} 
                    disabled={loading} 
                    className={`bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
                >
                    {loading ? 'LOADING' : 'CREATE'}
                </button>
            </form>
            <div className="wrapper container mx-auto mt-10 flex flex-wrap gap-2 justify-center">
                {
                    products.length > 0 && products.map(product => (
                        <Card delFunc={handeDelete} key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    );
}

export default Home;
