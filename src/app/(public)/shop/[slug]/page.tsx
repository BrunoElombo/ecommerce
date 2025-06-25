"use client"

import ProductCard from '@/components/ProductCard';
import { API_URL } from '@/constants/urls';
import { Product } from '@/types/Product';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from "sonner";

const Page = () => {
    // const router = useRouter();
    let {slug} = useParams();
    let { register, handleSubmit, formState:{errors},  } = useForm();
    const [product, setProduct] = useState<Product>();
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedVariations, setSelectedVariations] = useState<string[]>([]);
    // const [quantity, setQuantity] = useState<number>(1);
    // const [coupon, setCoupon] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingRelated, setIsLoadingRelated] = useState<boolean>(false);
    // const [cartCount, setCartCount] = useState<number>(0);

    useEffect(()=>{
        const handleFetchProduct = async()=>{
            setIsLoading(true);
            let url =`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`;
            try {
                const response = await fetch(url);
                const result = await response.json();
                if(result.error){
                    toast.error(result.error);
                    return;
                }
                setProduct(result.data);
            } catch (error) {
                console.log(error);
                toast.error('Failed to fetch product');
            } finally {
                setIsLoading(false);
            }
        }

        // Fetch related products
        const handleFetchRelatedProducts = async()=>{
            try {
                let url = `${process.env.NEXT_PUBLIC_API_URL}/products`;
                let response = await fetch(url);
                if(response.status !== 200){
                  console.log("Could not fetch products");
                  return;
                }
                let result = await response.json();
        
                setProducts(result.data);
              } catch (error) {
                console.log(error);
              }finally{
                setIsLoadingRelated(false);
            }
        }

        // Fetch cart count
        const fetchCartCount = async () => {
            try {
                const response = await fetch(`${API_URL}/cart-items`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.ok) {
                    const result = await response.json();
                    if (result.data) {
                        // Calculate total items in cart
                        // const totalItems = result.data.reduce((total: number, item: any) => total + item.qty, 0);
                        // setCartCount(totalItems);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch cart count:', error);
            }
        };

        handleFetchProduct();
        handleFetchRelatedProducts();
        fetchCartCount();
    }, [slug]);

    // Helper function to get variations by type
    const getVariationsByType = (type: string) => {
        return product?.variations?.filter(variation => 
            variation.type.toUpperCase() === type.toUpperCase()
        ) || [];
    };

    // Handle variation selection/deselection
    const handleVariationClick = (variationId: string) => {
        setSelectedVariations(prev => {
            if (prev.includes(variationId)) {
                return prev.filter(id => id !== variationId);
            } else {
                return [...prev, variationId];
            }
        });
    };

    // Check if variation is selected
    const isVariationSelected = (variationId: string) => {
        return selectedVariations.includes(variationId);
    };

    const handleAddToCart = async (data: any) => {
        if (!product) return;
        
        if (!data.qty) {
            toast.error('Please enter quantity');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/cart-items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    qty: parseInt(data.qty),
                    variations: selectedVariations,
                    userId: "83aad496-84b0-488d-a620-563ad1469f39"
                }),
            });

            let result = await response.json();

            if (result.error) {
                if (result.errors && Array.isArray(result.errors)) {
                    result.errors.forEach((err: any) => 
                        toast.error(err.msg)
                    );
                } else {
                    toast.error(result.error);
                }
                return;
            }

            toast.success('Product added to cart successfully!');
            
            // Update cart count
            // setCartCount(prev => prev + parseInt(data.qty));
            
            // Reset form
            setSelectedVariations([]);
            
        } catch (error) {
            console.error(error);
            toast.error('Failed to add product to cart. Please try again.');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className='min-h-screen p-4 md:p-8 lg:p-24'>
            {/* Breadcrumb */}
            <div className="text-sm breadcrumbs mt-8 mb-2">
                <ul className='flex items-center gap-2 pt-4'>
                    <li><Link href="/" className='text-gray-500'>Home / </Link></li>
                    <li><Link href="/shop" className='text-gray-500'>Shop / </Link></li>
                    <li>{product?.slug}</li>
                </ul>
            </div>

            {/* product */}
            <div className='w-full min-h-[70vh] flex flex-col md:flex-row gap-4'>
                <div className='w-full md:w-1/2 flex flex-col md:flex-row gap-4'>
                    {/* Product variations */}
                    <div className='flex gap-4 flex-row md:flex-col overflow-x-auto md:overflow-x-hidden md:overflow-y-auto order-2 md:order-1'>
                        <div className='w-[100px] min-h-[100px] max-h-[100px] rounded-lg bg-white relative'>
                            <div className="h-full flex items-center justify-center bg-gray-200 relative">
                                {product?.image ? (
                                    <Image
                                    src={product?.image}
                                    alt={product?.title}
                                    fill
                                    className="object-cover absolute"
                                    sizes="(max-width: 100px) 100px, (max-width: 100px) 50vw, 100px"
                                    />
                                ) : (
                                    <Image
                                        src={'/jk-wears-logo-black.svg'}
                                        alt={product?.title || "jk-wears-logo-black"}
                                        fill
                                        className="opacity-25"
                                        sizes="(max-width: 100px) 100px, (max-width: 100px) 50vw, 100px"
                                    />
                                )}
                            </div>
                        </div>
                        {/* Product images */}
                        {product?.productImage && product.productImage.length > 0 && (
                            product.productImage.map((image, index) => (
                                <div key={image.id} className='w-[100px] min-h-[100px] max-h-[100px] rounded-lg bg-white relative'>
                                    <div className="h-full flex items-center justify-center bg-gray-200 relative">
                                        <Image
                                            src={image.link}
                                            alt={`${product?.title} - Image ${index + 1}`}
                                            fill
                                            className="object-cover absolute"
                                            sizes="(max-width: 100px) 100px, (max-width: 100px) 50vw, 100px"
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {/* Product image */}
                    <div className='bg-white min-h-[400px] md:h-full h-[70%] w-full md:w-[80%] order-1 rounded-lg relative'>
                        {/* Product image */}
                        {product?.image ? (
                            <Image
                            src={product?.image}
                            alt={product?.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <Image
                                src={'/jk-wears-logo-black.svg'}
                                alt={product?.title || "jk-wears-logo-black"}
                                fill
                                className="opacity-25"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            </div>
                        )}
                        {/* Add to wish list */}
                        <span className='absolute top-5 right-5 bg-white rounded-full p-1 shadow'>
                            <HeartIcon className='h-5 text-gray-300'/>
                        </span>

                    </div>
                </div>

                {/* Product information */}
                <div className='w-full md:w-1/2 flex flex-col gap-4'>
                    {/* Categories */}
                    <div className='flex items-center gap-2 flex-wrap'>
                        {product?.categories?.map(category => 
                            <span key={category.id} className="text-gray-300 text-sm bg-gray-700 px-2 py-1 rounded">
                                {category.name}
                            </span>
                        )}
                    </div>

                    {/* Name */}
                    <div>
                        <p className='text-white text-4xl capitalize'>{product?.title}</p>
                    </div>

                    {/* Description */}
                    <div>
                        <p className='text-white text-sm leading-6 md:leading-8 font-poppins tracking-wide'>{product?.description}</p>
                    </div>

                    {/* Price */}
                    <div className='flex items-center gap-4 w-full'>
                        <p className={`text-white text-lg ${product?.salePrice && 'line-through'}`}>$ {product?.price} CA Dollars</p>
                        {product?.salePrice && <p className='text-white text-xl'>$ {product?.salePrice} CA Dollars</p>}
                    </div>

                    <form onSubmit={handleSubmit(handleAddToCart)}>
                        {/* Variations */}
                        {/* Size */}
                        {getVariationsByType('SIZE').length > 0 && (
                            <div className='space-y-2'>
                                <label className='text-white text-sm font-medium'>Size:</label>
                                <div className='flex items-center gap-2 flex-wrap'>
                                    {getVariationsByType('SIZE').map(variation => (
                                        <span 
                                            key={variation.id} 
                                            onClick={() => handleVariationClick(variation.id)}
                                            className={`text-xs capitalize p-2 px-4 cursor-pointer border border-white rounded-full hover:text-black hover:bg-white transition-all ${
                                                isVariationSelected(variation.id) ? 'bg-white text-black' : 'text-white'
                                            }`}
                                        >
                                            {variation.value}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Colors */}
                        {getVariationsByType('COLOR').length > 0 && (
                            <div className='space-y-2'>
                                <label className='text-white text-sm font-medium'>Color:</label>
                                <div className='flex items-center gap-2 flex-wrap'>
                                    {getVariationsByType('COLOR').map(variation => (
                                        <span 
                                            key={variation.id} 
                                            onClick={() => handleVariationClick(variation.id)}
                                            className={`text-xs capitalize p-2 px-4 cursor-pointer border border-white rounded-full hover:text-black hover:bg-white transition-all ${
                                                isVariationSelected(variation.id) ? 'bg-white text-black' : 'text-white'
                                            }`}
                                        >
                                            {variation.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Country */}
                        {getVariationsByType('COUNTRY').length > 0 && (
                            <div className='space-y-2'>
                                <label className='text-white text-sm font-medium'>Country:</label>
                                <div className='flex items-center gap-2 flex-wrap'>
                                    {getVariationsByType('COUNTRY').map(variation => (
                                        <span 
                                            key={variation.id} 
                                            onClick={() => handleVariationClick(variation.id)}
                                            className={`capitalize p-2 px-4 cursor-pointer border border-white rounded-lg hover:text-black hover:bg-white transition-all ${
                                                isVariationSelected(variation.id) ? 'bg-white text-black' : 'text-white'
                                            }`}
                                        >
                                            {variation.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add to cart */}
                        <div className='flex flex-col md:flex-row items-center gap-4 w-full mt-3'>
                            {/* Quantity */}
                            <div className='flex flex-col w-full md:w-1/3 space-y-1'>
                                <input 
                                    type="number" 
                                    {...register('qty', {
                                        required: "Quantity is required",
                                        min: { value: 1, message: "Quantity must be at least 1" }
                                    })} 
                                    min={1} 
                                    placeholder='Qty' 
                                    className='p-2 px-4 rounded-full bg-white text-black' 
                                />
                                {errors.qty && <p className="text-red-500 text-xs">{errors.qty.message?.toString()}</p>}
                            </div>
                            
                            {/* Add to cart */}
                            <button 
                                type="submit"
                                className='cursor-pointer rounded-full bg-white p-2 px-4 text-black text-sm w-full md:w-1/3 flex items-center justify-center gap-4 hover:shadow-red-500 hover:text-white hover:bg-transparent border border-white'
                            >
                                <ShoppingCartIcon className="h-6"/>
                                <span>Add to cart</span>
                            </button>
                        </div>
                        
                        {/* Reset choices */}
                        {selectedVariations.length > 0 && (
                            <div>
                                <span 
                                onClick={() => setSelectedVariations([])}
                                className='text-xs text-gray-400 cursor-pointer hover:underline hover:text-white'>
                                    Reset selections
                                </span>
                            </div>
                        )}
                        
                        {/* Key words */}
                        <div className='flex items-center gap-2 flex-wrap'>
                            {product?.keyWords?.map(keyword => 
                                <Link href="" key={keyword.id} className='text-white text-sm underline'>
                                    {keyword.name}
                                </Link>
                            )}
                        </div>
                    </form>
 
                </div>
            </div>

            {/* Related Products */}
            <div className='w-full h-screen mt-8 md:py-8'>
                <h4 className='text-4xl my-4 text-white'>Related products</h4>
                <div className='flex md:items-center gap-4 flex-col md:flex-row w-full'>
                {
                    isLoadingRelated ? 
                    <p>loading related product...</p> :
                    products.map((product) => (
                    <ProductCard 
                        key={product.slug}
                        name={product.name}
                        image={product.image || ''}
                        slug={product.slug}
                        description={product.description || ''}
                        price={product.price || 0}
                        stock={product.stock || 0}
                    />
                ))} 
                </div>
            </div>

            {/* Reviews from loggedIn clients*/}
            <div className='w-full'>

            </div>
        </div>
    );
}

export default Page;