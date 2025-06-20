"use client"

import ProductCard from '@/components/ProductCard';
import { Product, VariationType } from '@/types/Product';
import { HeartIcon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const Page = () => {
    const router = useRouter();
    let {slug} = useParams();
    let { register, handleSubmit, formState:{errors},  } = useForm();
    const [product, setProduct] = useState<Product>();
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [coupon, setCoupon] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingRelated, setIsLoadingRelated] = useState<boolean>(false);

    useEffect(()=>{
        const handleFetchProduct = async()=>{
            setIsLoading(true);
            let url =`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`;
            try {
                let response = await fetch(url);
                let result = await response.json();
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

        handleFetchProduct();
        handleFetchRelatedProducts();
    }, [slug]);

    const handleAddToCart = async (data:any) => {
        if (!product) return;
        
        // Validate required fields
        if (!data.quantity) {
            toast.error('Please enter quantity');
            return;
        }
        
        if (!selectedSize) {
            toast.error('Please select a size');
            console.log(data.quantity);
            return;
        }

        if (!selectedColor) {
            toast.error('Please select a color');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    quantity: data.quantity,
                    variations: [
                        { type: 'SIZE', value: selectedSize },
                        { type: 'COLOR', value: selectedColor }
                    ],
                    userId:"user 1"
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }

            toast.success('Added to cart successfully');
            router.push('/checkout');
        } catch (error) {
            console.error(error);
            toast.error('Failed to add to cart');
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
                    <li><a href="/" className='text-gray-500'>Home / </a></li>
                    <li><a href="/shop" className='text-gray-500'>Shop / </a></li>
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
                                    alt={product?.name}
                                    fill
                                    className="object-cover absolute"
                                    sizes="(max-width: 100px) 100px, (max-width: 100px) 50vw, 100px"
                                    />
                                ) : (
                                    <Image
                                        src={'/jk-wears-logo-black.svg'}
                                        alt={product?.name || "jk-wears-logo-black"}
                                        fill
                                        className="opacity-25"
                                        sizes="(max-width: 100px) 100px, (max-width: 100px) 50vw, 100px"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    {/* PRoduct image */}
                    <div className='bg-white min-h-[400px] md:h-full h-[70%] w-full md:w-[80%] order-1 rounded-lg relative'>
                        {/* Product image */}
                        {product?.image ? (
                            <Image
                            src={product?.image}
                            alt={product?.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <Image
                                src={'/jk-wears-logo-black.svg'}
                                alt={product?.name || "jk-wears-logo-black"}
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
                <form onSubmit={handleSubmit(handleAddToCart)} className='w-full md:w-1/2 flex flex-col gap-4'>
                    {/* Categories */}
                    <div className='flex items-center gap-2 flex-wrap'>
                        {product?.categories?.map(product=><span key={product.id}>{product.name}</span>)}
                    </div>

                    {/* Name */}
                    <div>
                        <p className='text-white text-4xl capitalize'>{product?.name}</p>
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

                    {/* Variations */}
                    {/* Size */}
                    <div className='flex items-center gap-2 flex-wrap'>
                        {
                            product
                            ?.variations
                            ?.filter(variation => variation.variation === "SIZE")
                            ?.map(variation => (
                                <span 
                                    key={variation.id} 
                                    onClick={() => setSelectedSize(variation.value)}
                                    className={` capitalize p-2 px-4 cursor-pointer border border-white rounded-lg hover:text-black hover:bg-white transition-all ${
                                        selectedSize === variation.value ? 'bg-white text-black' : 'text-white'
                                    }`}
                                >
                                    {variation.value}
                                </span>
                            ))
                        }
                    </div>

                    {/* Colors */}
                    <div className='flex items-center gap-2 flex-wrap'>
                        {
                            product
                            ?.variations
                            ?.filter(variation => variation.variation === "COLOR")
                            ?.map(variation => (
                                <span 
                                    key={variation.id} 
                                    onClick={() => setSelectedColor(variation.value)}
                                    className={`capitalize p-2 px-4 cursor-pointer border border-${variation.value}-500 bg-${variation.value}-300 text-${variation.value}-500 rounded-lg hover:text-black hover:bg-white transition-all ${
                                        selectedColor === variation.value ? 'bg-white text-black' : 'text-white'
                                    }`}
                                >
                                    {variation.value}
                                </span>
                            ))
                        }
                    </div>

                    {/* Add to cart */}
                    <div className='flex flex-col md:flex-row items-center gap-4 w-full'>
                        {/* Quantity */}
                        <div className='flex flex-col w-full md:w-1/3 space-y-1'>
                            <input 
                                type="number" 
                                {...register('quantity', {
                                    required: "Quantity is required",
                                    min: { value: 1, message: "Quantity must be at least 1" }
                                })} 
                                min={1} 
                                placeholder='Qty' 
                                className='p-2 px-4 rounded-full bg-white text-black' 
                            />
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
                    {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity.message?.toString()}</p>}
                    
                    {/* Reset choices */}
                    <div>
                        <span 
                        onClick={()=>{
                            setSelectedColor("");
                            setSelectedSize('');
                        }}
                        className='text-xs text-gray-400 cursor-pointer hover:underline hover:text-white'>
                            
                            {" "}
                            Reset
                        </span>
                    </div>
                    {/* Key words */}
                    <div className='flex items-center gap-2 flex-wrap'>
                        {product?.keyWords?.map(product=><Link href="" key={product.id} className='text-white text-sm underline'>{product.name}</Link>)}
                    </div>
                </form>
            </div>

            {/* Related Prodcuts */}
            <div className='w-full h-screen mt-8 md:py-8'>
                <h4 className='text-4xl my-4'>Related product</h4>
                <div className='flex md:items-center gap-4 flex-col md:flex-row w-full'>
                {
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