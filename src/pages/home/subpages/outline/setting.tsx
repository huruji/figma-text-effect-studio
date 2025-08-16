import SettingSwitchCom from 'src/components/setting-switch-com'
import SettingSliderCom from 'src/components/setting-slider-com'
import SettingColorselectorCom from 'src/components/setting-colorselector-com'
import SettingGradient, { type Palette } from 'src/components/gradient-setting'
import { h } from 'preact'

type OutlineSettingType = {
  enable: boolean
  setEnable: (enable: boolean) => void
  value: number
  setValue: (value: number) => void
  showGradient: boolean
  setShowGradient: (showGradient: boolean) => void
  direction: number
  setDirection: (direction: number) => void
  gradientColors: Palette[]
  activePalette: Palette
  setPalettes: (palettes: Palette[]) => void
  setActivePalette: (activePalette: Palette) => void
  solidColor: string
  setSolidColor: (solidColor: string) => void
}

const OutlineSetting = ({
  enable,
  showGradient,
  setEnable,
  setShowGradient,
  value,
  setValue,
  direction,
  setDirection,
  gradientColors,
  activePalette,
  setPalettes,
  setActivePalette,
  solidColor,
  setSolidColor
}: OutlineSettingType) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
      <SettingSwitchCom
        text={'Enable outline'}
        value={enable}
        setValue={setEnable}
      />
      {enable && <div>
        <SettingSliderCom
          minValue={0}
          maxValue={50}
          value={value}
          step={1}
          setValue={setValue}
          text={'Outline width'}
        />
        {/* <NumberInput max={50} min={0} step={1} value={value} hasSpinButtons onChange={setValue} /> */}
        <div style={{
          marginTop: '8px'
        }}><SettingSwitchCom
          text={'Use gradient'}
          value={showGradient}
          setValue={setShowGradient}
        />
        </div>
        {showGradient && <SettingGradient
          direction={direction || 0}
          setDirection={setDirection}
          palettes={gradientColors}
          activePalette={activePalette}
          setPalettes={setPalettes}
          setActivePalette={setActivePalette}
        />}
        {!showGradient && <SettingColorselectorCom
          text={'Color'}
          colors={[solidColor]}
          setColors={(val) => {
            setSolidColor(val[0])
          }}
        />}
      </div>}
    </div>
  )
}

export default OutlineSetting
