import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import {useSearchParams} from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'

/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}

const getTechs = (params: ParamsType) => {
    return axios
        .get<{ techs: TechType[], totalCount: number }>(
            'https://samurai.it-incubator.io/api/3.0/homework/test3',
            {params}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW15 = () => {
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(4)
    const [idLoading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(100)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<TechType[]>([])

    console.log("searchParams: "+searchParams)

    const sendQuery = (params: any) => {
        setLoading(true)
        getTechs(params)
            .then((res) => {

                // делает студент
                // сохранить пришедшие данные
                if (res?.data!==undefined){
                    console.log(res.data.techs)
                    setTechs(res.data.techs)
                    setTotalCount(res.data.totalCount)
                    setLoading(false)
                }
                //
            })
    }

    const onChangePagination = (newPage: number, newCount: number) => {
        // делает студент
        setPage(newPage)
        setCount(newCount)

        sendQuery({page: newPage, count: newCount})
        setSearchParams( `page=${newPage}&count=${newCount}`)


        // setPage(
        // setCount(

        // sendQuery(
        // setSearchParams(

        //
    }

    const onChangeSort = (newSort: string) => {
        // делает студент

        console.log('sort: '+newSort)
        setSort(newSort)
        setPage(1)

        sendQuery({page: page, count: searchParams.get("count")})
        setSearchParams( `page=${page}&count=${count}`)

        // setSort(
        // setPage(1) // при сортировке сбрасывать на 1 страницу

        // sendQuery(
        // setSearchParams(

        //
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        sendQuery({page: params.page, count: params.count})
        setPage(+params.page || 1)
        setCount(+params.count || 4)
    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t.id} className={s.row}>
            <div id={'hw15-tech-' + t.id} className={s.tech}>
                {t.tech}
            </div>

            <div id={'hw15-developer-' + t.id} className={s.developer}>
                {t.developer}
            </div>
        </div>
    ))

    if (sort==='0tech'){
        techs.sort(function(a:any, b:any){
            let nameA=a.tech, nameB=b.tech
            if (nameA < nameB) //сортируем строки по возрастанию
                return -1
            if (nameA > nameB)
                return 1
            return 0 // Никакой сортировки
        })
    }
    if (sort==='1tech'){
        techs.sort(function(a:any, b:any){
            let nameA=a.tech, nameB=b.tech
            if (nameA > nameB) //сортируем строки по убыванию
                return -1
            if (nameA < nameB)
                return 1
            return 0 // Никакой сортировки
        })
    }
    if (sort==='0developer'){
        techs.sort(function(a:any, b:any){
            let nameA=a.developer, nameB=b.developer
            if (nameA < nameB) //сортируем строки по возрастанию
                return -1
            if (nameA > nameB)
                return 1
            return 0 // Никакой сортировки
        })
    }
    if (sort==='1developer'){
        techs.sort(function(a:any, b:any){
            let nameA=a.developer, nameB=b.developer
            if (nameA > nameB) //сортируем строки по убыванию
                return -1
            if (nameA < nameB)
                return 1
            return 0 // Никакой сортировки
        })
    }

    return (
        <div id={'hw15'}>
            <div className={s2.hwTitle}>Homework #15</div>

            <div className={s2.hw}>
                {idLoading && <div id={'hw15-loading'} className={s.loading}>Loading...</div>}

                <SuperPagination
                    page={page}
                    itemsCountForPage={count}
                    totalCount={totalCount}
                    onChange={onChangePagination}
                />

                <div className={s.rowHeader}>
                    <div className={s.techHeader}>
                        tech
                        {/*<SuperSort sort={sort} value={'tech'} onChange={onChangeSort}/>*/}
                        <SuperSort
                            sort={sort}
                            value={'tech'}
                            onChange={onChangeSort}
                            // setSort={setSort}
                        />
                    </div>

                    <div className={s.developerHeader}>
                        developer
                        <SuperSort sort={sort} value={'developer'} onChange={onChangeSort}/>
                    </div>
                </div>

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW15
