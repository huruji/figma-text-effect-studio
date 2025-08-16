import { useEffect } from 'preact/compat'
import { settingAtom } from 'src/atoms/setting'
import { useAtom } from 'jotai'
import useSlug from './use-font-slug'
import Back from 'src/components/back'
import { getCacheData, setCacheData } from 'src/util'
import { Text, SearchTextbox, Button } from '@create-figma-plugin/ui'
import { useSetState } from 'ahooks'
import InfiniteScroll from 'react-infinite-scroller'
import { loadFonts } from 'src/util'
import '!./index.css'
import Slider from "react-slick"
import { h } from 'preact'


type FontType = {
  name: string
  url: string
  img: string
  darkImg: string
  subsets: string[]
  category: string
}

const pageSize = 60

const FontSettingPage = () => {
  const slugs = useSlug()
  const isDark = false
  const [setting, setSetting] = useAtom(settingAtom)
  const [state, setState] = useSetState<{
    page: number
    hasMore: boolean
    hasInit: boolean
    isLoadingMore: boolean
    loadingUrl: string
    fonts: FontType[]
    searchValue: string
    selectedSlug: string
  }>({
    page: 1,
    hasMore: true,
    hasInit: false,
    isLoadingMore: false,
    loadingUrl: '',
    fonts: (window as any).AllFonts,
    searchValue: '',
    selectedSlug: ''
  })

  const onCancel = () => {
    setSetting((s) => {
      return {
        ...s,
        page: 'home',
      }
    })
  }

  useEffect(() => {
    let fonts: FontType[] = (window as any).AllFonts.filter((item) => {
      return item.name.toLowerCase().includes(state.searchValue.toLowerCase().trim())
    })
    if (state.selectedSlug) {
      fonts = fonts.filter((item) => {
        let includes = false
        if (item.category?.toLowerCase() === state.selectedSlug.toLowerCase()) {
          return true
        }
        includes = (item.subsets.map((subset) => subset.toLowerCase())).filter((subset) => subset.includes(state.selectedSlug.toLowerCase())).length > 0
        return includes
      })
    }
    setState((prev) => {
      return {
        ...prev,
        fonts: [...fonts],
        page: 1,
        // isLoadingMore: false
      }
    })
  }, [state.searchValue, state.selectedSlug])

  useEffect(() => {
    const needLoadFonts = (window as any).AllFonts.slice(0, 80)
    loadFonts(needLoadFonts)
    setTimeout(() => {
      setState({
        hasInit: true
      })
    }, 3000)
  }, [])

  return (
    <div className={'font-setting-page'} style={setting.page !== 'font' ? {
      display: 'none'
    } : {}}>
      <div>
        <div style={{ backgroundColor: 'var(--spectrum-global-color-static-white)', position: 'sticky', top: 0, zIndex: 1, }}>
          <Back onCancel={onCancel} title={'Fonts'} />
          <div>
            <div style={{
              paddingBottom: 'var(--spectrum-global-dimension-size-100)'
            }}>
              <SearchTextbox
            // ref={searchRef}
            onInput={(event) => {
              const newValue = (event.currentTarget as HTMLInputElement).value;
              setState((s) => {
                return {
                  ...s,
                  searchValue: newValue
                }
              })
            }}
                value={state.searchValue}
                placeholder="search font"
              />
              {/* <SearchTextbox
                width='100%'
                type='search'
                onChange={(val) => {
                  setState((s) => {
                    return {
                      ...s,
                      searchValue: val
                    }
                  })
                }}
                value={state.searchValue}
              /> */}
            </div>

            {/* {slugs?.length > 0 && (
          <div style={{
            paddingBottom: 'var(--spectrum-global-dimension-size-100)',
          }}>
            <div className='slider-container'>
              <Slider slidesToShow={'auto'} {
                ...{
                  dots: false,
                  infinite: false,
                  speed: 300,
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              }>{slugs.map((item) => {
                const type = state.selectedSlug === item.key ? 'accent' : 'secondary'
                return <div>
                  <Button key={item.key} variant={type} onPress={() => {
                    if (state.selectedSlug === item.key) {
                      setState((s) => {
                        return {
                          ...s,
                          selectedSlug: '',
                        }
                      })
                      return
                    }
                    setState((s) => {
                      return {
                        ...s,
                        selectedSlug: item.key,
                      }
                    })
                  }}>{item.label}</Button>
                </div>
              })}
              </Slider>
            </div>
          </div>
        )}
             */}
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8'
        }}>
          {(state.fonts).length === 0
            && <div >
              <Text>
                Sorry, we couldn’t find any fonts for {state.searchValue}. Try searching for something related.
              </Text>
            </div>
          }
          <InfiniteScroll
            loadMore={() => {
              if (!state.hasInit || state.isLoadingMore) {
                return
              }
              setState((s) => {
                const page = s.page + 1
                let hasMore = true
                // console.log('loading more', page)
                if (page * pageSize >= (state.fonts || []).length) {
                  hasMore = false
                }
                // const needLoadFonts = (window as any).AllFonts.slice(0, (page + 1) * pageSize)
                // loadFonts(needLoadFonts)
                // console.log('hasMore', hasMore)
                const timer = setTimeout(() => {
                  setState((s) => {
                    return {
                      ...s,
                      isLoadingMore: false
                    }
                  })
                  clearTimeout(timer)
                }, 2000)
                return {
                  ...s,
                  page,
                  hasMore,
                  isLoadingMore: true
                }
              })
            }}
            hasMore={state.hasMore}
            loader={null}
            useWindow={false}
            getScrollParent={() => document.getElementById('root')?.querySelector('.font-setting-page')}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spectrum-global-dimension-size-50)'
            }}>{(state.fonts).slice(0, state.page * pageSize > (state.fonts || []).length ? (state.fonts || []).length : state.page * pageSize).map((item, index) => {
              return (<div className='font-container' key={item.url} onClick={async () => {
                await loadFonts([item])
                setSetting((s) => {
                  return {
                    ...s,
                    page: 'home',
                    fontName: item.name,
                    currentConfig: {
                      ...s.currentConfig,
                      font: {
                        ...item,
                        src: item.url,
                      },
                    },
                  }
                })
                try {
                  setCacheData('fontName', item.name)
                  // localStorage.setItem('fontName', item.name)
                  localStorage.setItem('fontConfig', JSON.stringify(item))
                } catch (e) {
                  console.error(e)
                }
              }}>
                <img
                  style={{
                    height: 40,
                    width: 'auto',
                    maxWidth: '100%',
                  }}
                  alt={item.name}
                  src={isDark ? item.darkImg : item.img}
                />
              </div>)
            })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div >
  )
}

export default FontSettingPage
