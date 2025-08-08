import SettingSliderCom from 'src/components/setting-slider-com'
import SettingSwitchCom from 'src/components/setting-switch-com'
import SettingColorselectorCom from 'src/components/setting-colorselector-com'
import SettingGradient, { type Palette } from 'src/components/gradient-setting'

interface SettingProps {
  enable: boolean
  setEnable: (enable: boolean) => void
  value: number
  setValue: (value: number) => void
  angle: number
  setAngle: (angle: number) => void
  opacity: number
  setOpacity: (opacity: number) => void
  showGradient: boolean
  setShowGradient: (showGradient: boolean) => void
  direction: number
  setDirection: (direction: number) => void
  gradientColors: Palette[]
  activePalette: Palette
  setPalettes: (palettes: Palette[]) => void
  setActivePalette: (palette: Palette) => void
  solidColor: string
  setSolidColor: (colors: string[]) => void
}
const Setting = ({
  enable,
  setEnable,
  value,
  setValue,
  angle,
  setAngle,
  opacity,
  setOpacity,
  showGradient,
  setShowGradient,
  direction,
  setDirection,
  gradientColors,
  activePalette,
  setPalettes,
  setActivePalette,
  solidColor,
  setSolidColor,
}: SettingProps) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spectrum-global-dimension-size-100)' }}>
      <SettingSwitchCom
        text={'Enable depth'}
        value={enable}
        setValue={setEnable}
      />
      {enable && <>
        <SettingSliderCom
          minValue={0}
          maxValue={100}
          value={Math.round(value * 100)}
          step={1}
          setValue={setValue}
          text={'Size'}
        />
        {/* <NumberInput max={100} min={0} step={1} value={Math.round(value * 100)} hasSpinButtons onChange={setValue} /> */}
        <SettingSliderCom
          value={angle}
          minValue={-180}
          maxValue={180}
          setValue={setAngle}
          text={'Angle'}
        />
        <SettingSliderCom
          value={opacity}
          minValue={0}
          maxValue={1}
          step={0.01}
          setValue={setOpacity}
          text={'Opacity'}
        />
        <SettingSwitchCom
          text={'Use gradient'}
          value={showGradient}
          setValue={setShowGradient}
        />
        {showGradient && <SettingGradient
          direction={direction || 0}
          setDirection={setDirection}
          palettes={gradientColors}
          activePalette={activePalette}
          setPalettes={setPalettes}
          setActivePalette={setActivePalette}
          hideDirection={true}
        />}
        {!showGradient && <SettingColorselectorCom
          text={'Color'}
          colors={[solidColor]}
          setColors={setSolidColor}
        />}
      </>}
    </div>
  )
};

export default Setting
