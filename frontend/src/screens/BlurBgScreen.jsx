import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchBlurBg, fetchGetBlurBg } from '@/features/BlurBgSlice'

import ReactCompareImage from 'react-compare-image'
import { Loader2 } from "lucide-react"
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Label } from "../components/ui/label"

function BlurBgScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userInfo = useSelector((state) => state.user.userInfo)
    const blurBg = useSelector((state) => state.blurBg.blurBg)
    const getBlurBg = useSelector((state) => state.blurBg.getBlurBg)
    const blurBgStatus = useSelector((state) => state.blurBg.blurBgStatus)
    const getBlurBgStatus = useSelector((state) => state.blurBg.getBlurBgStatus)
    console.log(blurBgStatus, blurBgStatus);

    const blurBgImage = getBlurBg ? getBlurBg.result : ''
    const original = getBlurBg ? getBlurBg.original : ''

    useEffect(() => {
        if (!userInfo && !userInfo.is_varified) {
            navigate('/login')
        }
    }, [userInfo, navigate])

    useEffect(() => {
        if (blurBgStatus === 'succeeded') {
            dispatch(fetchGetBlurBg(blurBg.id))
        }
    }, [blurBgStatus, dispatch, blurBg])

    const [hide, setHide] = useState(false)
    const [model, setModel] = useState('')

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
            dispatch(fetchBlurBg({
                model: model,
                image: e.target.files[0]
            }))
        } else {
            alert('Please drop an image file.');
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const uploadHndler = (e) => {
        e.preventDefault();
        dispatch(fetchBlurBg({
            model: model,
            image: e.target.files[0]
        }))
    }

    const animeHandler = () => {
        setModel('anime')
        setHide(true)
    }

    const generalHandler = () => {
        setModel('general')
        setHide(true)
    }

    const lastHandler = () => {
        setModel('last')
        setHide(true)
    }

    return (
        <div className='w-full mx-auto flex justify-center'>
            <Card className='w-[95%] md:w-[80%] lg:w-[60%] mt-10 h-auto'>
                <CardHeader>
                    <CardTitle className="text-lg md:text-2xl text-center">Blur Background</CardTitle>
                </CardHeader>
                <CardContent>
                    {blurBgStatus === 'idle' ? (
                        <div className="h-full flex flex-col space-y-4 my-2 items-center">
                            {!hide && (
                                <div className="flex flex-col items-center space-y-2 text-sm md:text-base">
                                    <p>Before uploading the image choose image type if both not work use last</p>
                                    <div className='flex space-x-2' >
                                        <Button variant="outline" onClick={animeHandler}>Anime</Button>
                                        <Button variant="outline" onClick={generalHandler}>General</Button>
                                        <Button variant="outline" onClick={lastHandler}>Last</Button>
                                    </div>
                                </div>
                            )}
                            <Label className="text-base md:text-lg" htmlFor="image">Upload Image</Label>
                            <Input
                                name="image"
                                type="file"
                                accept="image/*"
                                className='w-full dark:file:text-white cursor-pointer'
                                onChange={(e) => { uploadHndler(e) }}
                            />
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                className="w-full h-96 border-2 flex justify-center items-center rounded-md md:text-lg"
                            >
                                Drag and drop image here
                            </div>
                        </div>
                    ) : blurBgStatus === 'loading' ? (
                        <Loader2 className="w-14 h-14 animate-spin mx-auto" />
                    ) : blurBgStatus === 'succeeded' ? (
                        <p className='text-center text-lg' >Image Uploaded</p>
                    ) : blurBgStatus === 'failed' ? (
                        <p className='text-center text-lg'>Something went wrong</p>
                    ) : null}
                </CardContent>
                {getBlurBgStatus === 'succeeded' && (
                    <CardFooter>
                        <div className='flex flex-col w-full space-y-4'>
                            <p className='text-center'>Compare</p>
                            <div className='w-full h-auto'>
                                <img src="{original}" className="w-full" alt="" />
                                <ReactCompareImage leftImage={original} leftImageLabel='Original' rightImage={blurBgImage} rightImageLabel='Bg Removed' sliderLineColor='#6d28d9' />

                            </div>
                            <Button className="w-full"><a href={blurBgImage} download="removeBg.png">Download</a></Button>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}

export default BlurBgScreen