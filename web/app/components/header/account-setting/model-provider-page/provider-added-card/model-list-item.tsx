import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import type { CustomConfigurationModelFixedFields, ModelItem, ModelProvider } from '../declarations'
import { ConfigurationMethodEnum, ModelStatusEnum } from '../declarations'
import ModelBadge from '../model-badge'
import ModelIcon from '../model-icon'
import ModelName from '../model-name'
import Button from '@/app/components/base/button'
import { Balance } from '@/app/components/base/icons/src/vender/line/financeAndECommerce'
import { Settings01 } from '@/app/components/base/icons/src/vender/line/general'
import Switch from '@/app/components/base/switch'
import TooltipPlus from '@/app/components/base/tooltip-plus'

export type ModelListItemProps = {
  model: ModelItem
  provider: ModelProvider
  isConfigurable: boolean
  onConfig: (currentCustomConfigrationModelFixedFields?: CustomConfigurationModelFixedFields) => void
  onModifyLoadBalancing?: (model: ModelItem) => void
}

const ModelListItem = ({ model, provider, isConfigurable, onConfig, onModifyLoadBalancing }: ModelListItemProps) => {
  const { t } = useTranslation()

  return (
    <div
      key={model.model}
      className={classNames(
        'group flex items-center pl-2 pr-2.5 h-8 rounded-lg',
        isConfigurable && 'hover:bg-gray-50',
        model.deprecated && 'opacity-60',
      )}
    >
      <ModelIcon
        className='shrink-0 mr-2'
        provider={provider}
        modelName={model.model}
      />
      <ModelName
        className='grow text-sm font-normal text-gray-900'
        modelItem={model}
        showModelType
        showMode
        showContextSize
      >
        {/* TODO: check feature switch */}
        <ModelBadge className='ml-1 uppercase text-indigo-600 border-indigo-300'>
          <Balance className='w-3 h-3 mr-0.5' />
          {t('common.modelProvider.loadBalancingHeadline')}
        </ModelBadge>
      </ModelName>
      <div className='shrink-0 flex items-center'>
        {
          model.fetch_from === ConfigurationMethodEnum.customizableModel && (
            <Button
              className='hidden group-hover:flex py-0 h-7 text-xs font-medium text-gray-700'
              onClick={() => onConfig({ __model_name: model.model, __model_type: model.model_type })}
            >
              <Settings01 className='mr-[5px] w-3.5 h-3.5' />
              {t('common.modelProvider.config')}
            </Button>
          )
        }
        {/* <Indicator
        className='ml-2.5'
        color={model.status === ModelStatusEnum.active ? 'green' : 'gray'}
      /> */}
        {/* TODO: check feature switch */}
        {!model.deprecated && [ModelStatusEnum.active, ModelStatusEnum.disabled].includes(model.status) && (
          <Button
            className='opacity-0 group-hover:opacity-100 m-2 px-3 h-[28px] text-xs text-gray-700 rounded-md transition-opacity'
            onClick={() => onModifyLoadBalancing?.(model)}
          >
            <Balance className='mr-1 w-[14px] h-[14px]' />
            {t('common.modelProvider.configLoadBalancing')}
          </Button>
        )}
        {
          model.deprecated
            ? (
              <TooltipPlus popupContent={<span className='font-semibold'>{t('common.modelProvider.modelHasBeenDeprecated')}</span>} offset={{ mainAxis: 4 }}>
                <Switch defaultValue={false} disabled size='md' />
              </TooltipPlus>
            )
            : (
              <Switch
                defaultValue={model?.status === ModelStatusEnum.active}
                disabled={![ModelStatusEnum.active, ModelStatusEnum.disabled].includes(model.status)}
                size='md'
                onChange={async value => value}
              />
            )
        }
      </div>
    </div>
  )
}

export default memo(ModelListItem)
