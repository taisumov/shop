import React, {useContext, useEffect, useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import Input from "../ui/input/Input";
import voiceImage from '../static/img/voice.svg'
import sound from '../static/audio/start_recording.mp3'
import axios from "axios";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Scrollbar} from "swiper";
import ShopCard from "../ui/shopcard/ShopCard";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getRecs} from "../http/itemsAPI";
import jwt_decode from "jwt-decode";

const Search = observer(() => {
    SwiperCore.use([Scrollbar, Navigation]);

    const {user} = useContext(Context)

    const [recs, setRecs] = useState([])
    const [speech, setSpeech] = useState('')
    const [autoComplete, setAutoComplete] = useState({text: ['розы', 'тюльпаны', 'лилии', 'пионы'], pos: 0, endOfWord: false})
    const {transcript, resetTranscript} = useSpeechRecognition();
    let audio = new Audio(sound)

    useEffect(() => {
        getRecs((jwt_decode(localStorage.getItem('token'))).id).then(data => setRecs(data))
    }, [])

    useEffect(() => {
        setSpeech(transcript.slice(-1) === '.' ? transcript.slice(0, -1) : transcript)
    }, [transcript])

    useEffect(() => {
        if (speech !== '') {
            axios.get(`https://predictor.yandex.net/api/v1/predict.json/complete?key=${apiKey}&q=${speech.split(' ').join('+')}&lang=ru&limit=4`).then(data => {
                console.log(data.data)
                setAutoComplete({text: data.data.text, pos: data.data.pos, endOfWord: data.data.endOfWord})
            })
        }
        if(speech === ''){
            setAutoComplete({text: ['розы', 'тюльпаны', 'лилии', 'пионы'], pos: 0, endOfWord: false})
        }
    }, [speech])

    const apiKey = 'pdct.1.1.20220523T153212Z.0070f8281e3481c8.f466f006d83042313b336a7ae83b4acb0b11b26d'

    return (
        <div>
            <div className={'voiceSearch'}>
                <div className={'inputVoiceSearch'}>
                    <Input
                        value={speech}
                        callback={setSpeech}
                        button={{
                            icon: voiceImage,
                            callback: () => {
                                SpeechRecognition.startListening();
                                audio.play()
                            }
                        }}
                        id={1}
                        type={'text'}
                        name={'Начните поиск'}
                        //focus={setInputFocus}
                    />
                </div>
                <div className='autocompleteContainer'>
                    {autoComplete.text.map(i =>
                        <div className={'autoComplete'}
                             onClick={() => {
                                 setSpeech(autoComplete.endOfWord
                                     ?
                                     speech + (speech.slice(-1) === ' ' ? '' : ' ') + i
                                     :
                                     speech.slice(0, autoComplete.pos || speech.length - 1) + i)
                             }}
                        >
                            {i}
                        </div>
                    )}
                </div>
                {user.isAuth &&
                    <div className={'searchRecs'}>
                        <h1>Рекомендации для вас</h1>
                        <div className={'swiperRecs'}>
                            <Swiper
                                style={{padding: '0 50px', userSelect: 'none'}}
                                modules={[Scrollbar, Navigation]}
                                spaceBetween={50}
                                slidesPerView={4}
                                speed={500}
                                navigation
                                scrollbar={{draggable: true}}
                                //preventClicks={false}
                                //preventClicksPropagation={false}
                            >
                                {recs.map(rec =>
                                    <SwiperSlide key={rec.id} style={{height: '100%'}}>
                                        <ShopCard item={rec} to={rec.id}/>
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
});

export default Search;