import { useEffect, useRef } from 'preact/compat'
import { settingAtom } from 'src/atoms/setting'
import { useAtom } from 'jotai'
import { h } from 'preact'
// import { Flex, ProgressCircle, Text, Badge, Image, View, Grid, SearchField, Button, ButtonGroup } from '@adobe/react-spectrum'

import { useSetState } from 'ahooks'
import InfiniteScroll from 'react-infinite-scroller'
import { getEffectData } from 'src/services/index'
import './index.css'
import useSlug from './use-slug'
// import Slider from "react-slick"
import {
  Button,
  Columns,
  Container,
  Muted,
  render,
  Text,
  TextboxNumeric,
  VerticalSpace,
  LoadingIndicator,
  SearchTextbox,
  Stack,
} from '@create-figma-plugin/ui'

const pageSize = 20

const IndexPage = () => {
  const [setting, setSetting] = useAtom(settingAtom)
  const [state, setState] = useSetState<{
    page: number
    hasMore: boolean
    hasInit: boolean
    isLoadingMore: boolean
    data: any[]
    total: number
    pageLoading: boolean
  }>({
    page: 1,
    hasMore: true,
    hasInit: false,
    isLoadingMore: false,
    data: [],
    total: 0,
    pageLoading: false,
  })
  const searchRef = useRef<HTMLInputElement>(null)
  const slugs = useSlug()

  // 默认焦点到搜索框
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }, [])

  // Fetch data on mount and when search changes
  useEffect(() => {
    setState({
      total: 0,
      page: 2,
      data: [],
      hasMore: true,
      hasInit: false,
      pageLoading: true
    })
    const searchValue = setting.searchValue
    getEffectData({
      page: 1,
      pageSize: pageSize * 2,
      searchValue,
    }).then((res: any) => {
      // If res is array, treat as data, else {data, total}
      const data = Array.isArray(res) ? res : res.data || []
      const total = Array.isArray(res) ? res.length : res.total || 0
      setState((s) => {
        // 如果搜索值发生变化，则清空数据
        if (searchValue !== setting.searchValue) {
          return {
            ...s,
            data: [],
            total: 0
          }
        }
        return {
          ...s,
          data,
          total
        }
      })
    }).finally(() => {
      debugger
      setState((s) => ({
        ...s,
        hasInit: true,
        hasMore: true,
        pageLoading: false
      }))
    })

  }, [setting.searchValue])

  // Load more data on scroll
  const loadMore = () => {
    debugger
    if (!state.hasInit || state.isLoadingMore || !state.hasMore) {
      return
    }
    const nextPage = state.page + 1
    setState({
      isLoadingMore: true,
      page: nextPage
    })
    getEffectData({
      page: nextPage,
      pageSize,
      searchValue: setting.searchValue,
    }).then((res: any) => {
      const data = Array.isArray(res) ? res : res.data || []
      const total = Array.isArray(res) ? res.length : res.total || 0
      setState((s) => {
        const newData = [...s.data, ...data]
        let hasMore = newData.length < total
        if (data.length === 0) hasMore = false
        return {
          data: newData,
          total,
          hasMore,
          isLoadingMore: false
        }
      })
    }).catch(() => {
      setState({ isLoadingMore: false })
    })
  }

  return (
    <div className="index-page" style={setting.page !== 'index' ? { display: 'none', height: '100%' } : {
      height: '100vh',
      overflow: 'scroll'
    }}>
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: 'var(--spectrum-global-color-static-white)',
      }}>
        <div style={{
          paddingBottom: 'var(--spectrum-global-dimension-size-100)',
        }}>
          <SearchTextbox
            ref={searchRef}
            onInput={(event) => {
              const newValue = (event.currentTarget as HTMLInputElement).value;
              setSetting((s: any) => ({ ...s, searchValue: newValue }))
            }}
            value={setting.searchValue}
            placeholder="搜索文字效果..."
          />
        </div>
        {/* {slugs?.length > 0 && (
          <div style={{
            paddingBottom: 'var(--spectrum-global-dimension-size-100)',
          }}>
            <div className='slider-container'>
              <Slider {
                ...{
                  dots: false,
                  infinite: false,
                  speed: 300,
                  slidesToShow: 3,
                  slidesToScroll: 3
                }
              }>{slugs.map((item) => {
                const type = setting.searchValue === item.key ? 'accent' : 'secondary'
                return <div>
                  <Button UNSAFE_className='cursor-pointer' key={item.key} variant={type} onPress={() => {
                    setSetting((s: any) => ({
                      ...s,
                      searchValue: s.searchValue === item.key ? '' : item.key
                    }))
                  }}>{item.label}</Button>
                </div>
              })}
              </Slider>
            </div>
          </div>
        )} */}
      </div>
      {state.pageLoading && <div style={{ paddingTop: `var(--spectrum-global-dimension-size-200)`, display: 'flex', justifyContent: 'center' }}>
        <LoadingIndicator />
      </div>}
      {!state.pageLoading && state.total === 0 && (
        <Stack space="small">
          <Text>
            {!setting.searchValue
              ? `Service error, please try again later.`
              : `Sorry, we couldn't find any presets for ${setting.searchValue}. Try searching for something related.`}
          </Text>
        </Stack>
      )}
      <div>
        <InfiniteScroll
          threshold={30}
          loadMore={loadMore}
          hasMore={state.hasMore}
          loader={state.pageLoading ? null : <div style={{ paddingTop: 'var(--spectrum-global-dimension-size-200)', display: 'flex', justifyContent: 'center' }}><LoadingIndicator /></div>}
          useWindow={false}
          getScrollParent={() => document.getElementById('root')?.querySelector('.index-page')}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-small)',
            padding: 'var(--space-small)'
          }}>
            {state.data.map((item, index) => (
              <div style={{
                position: 'relative',
                cursor: 'pointer',
                borderRadius: '4px',
                height: 80,
                border: '1px solid var(--figma-color-border)',
                overflow: 'hidden'
              }} key={item.id || item.name}>
                <div
                  style={{ position: 'relative', borderRadius: '4px', cursor: 'pointer' }}
                  onClick={() => {
                    let page = 'home'
                    let premiumPrePage = ''
                    if (item.isPro && !setting.userIsPro) {
                      page = 'premium'
                      premiumPrePage = 'index'
                    }
                    setSetting((s: any) => ({
                      ...s,
                      selectedEffect: { ...item },
                      currentConfigId: item.id,
                      currentConfigR2Url: item.r2_config_url,
                      page,
                      subPage: 'text',
                      premiumPrePage
                    }))
                  }}
                >
                  <div>
                    <img src={item.img} alt={item.origin_id} style={{ width: '100%', height: '100%', objectFit: 'cover',cursor: 'pointer' }} />
                    {item.isPro && <div style={{ position: 'absolute', bottom: 8, right: 8 }}>
                      <div style={{
                        backgroundColor: 'var(--figma-color-bg-brand)',
                        color: 'var(--figma-color-text-onbrand)',
                        padding: '2px 6px',
                        borderRadius: 'var(--border-radius-6)',
                        fontSize: '12px',
                        fontWeight: '600',
                        lineHeight: '1',
                        border: 'var(--border-width-1) solid var(--figma-color-border-onbrand)',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                      }}>
                        Pro
                      </div>
                    </div>}
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'var(--spectrum-global-dimension-size-100)' }}>
                    <Text>{item.origin_id}</Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default IndexPage
