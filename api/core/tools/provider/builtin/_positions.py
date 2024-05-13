import os.path

from core.helper.position_helper import get_position_map, sort_by_position_map
from core.tools.entities.user_entities import UserToolProvider


class BuiltinToolProviderSort:
    _position = {}

    @classmethod
    def sort(cls, providers: list[UserToolProvider]) -> list[UserToolProvider]:
        if not cls._position:
            cls._position = get_position_map(os.path.join(os.path.dirname(__file__), '..'))

        def name_func(provider: UserToolProvider) -> str:
            if provider.type == UserToolProvider.ProviderType.MODEL:
                return f'model.{provider.name}'
            else:
                return provider.name

        sorted_providers = sort_by_position_map(cls._position, providers, name_func)

        return sorted_providers