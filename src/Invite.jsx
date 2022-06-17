import React, { useCallback, useEffect, useState } from "react";
import map from "lodash/map";
import axios from "axios";
import reduce from "lodash/reduce";
import { RadioButton } from "./RadioButton";
import { Resource } from "./Resource";
import {ScopeItem} from "./ScopeItem"

const { forwardRef,  useImperativeHandle } = React;
const Invite = forwardRef(({ settings, edit }, ref) => {
  const [resources, setResources] = useState();
  const [selectedScopeCategories, setSelectedScopeCategories] = useState([]);
  const [activeRole, setActiveRole] = useState({});

  const getPermissions = () => {
    axios
      .get("https://raw.githubusercontent.com/RakulAgn/CheckBoxReact/master/src/data.json")
      .then((response) => {
        setResources(response.data);
      })
      .catch((error) => {
       console.log(error);
      });
  };

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    edit && settings && setPredefinedScopeStatus(settings);
  }, [settings]);

  useImperativeHandle(ref, () => ({
    getScopes() {
      return getSelectedScopes();
    },
  }));

  const getSelectedScopeCategories = () => {
    const categories = [];

    map(resources, resource => {
      map(resource.scopes, scope => {
        if (!categories.includes(scope.category) && scope.checked)
          categories.push(scope.category);
      });
    });

    return categories;
  };

  const scopeClickHandler = useCallback(
    data => {
      clearActiveRole();
      const { selectedScope, resourceIndex, scopeIndex } = data;

      if (!selectedScope) return;

      const cacheResources = { ...resources };

      cacheResources[resourceIndex].scopes[scopeIndex].checked =
        !selectedScope.checked;
      const selectedScopeCategories = getSelectedScopeCategories();

      setSelectedScopeCategories(selectedScopeCategories);
      setResources(cacheResources);
    },
    [resources]
  );

  const resourceClickHandler = useCallback(
    data => {
      clearActiveRole();
      const { resourceIndex } = data;
      const cacheResources = { ...resources };
      cacheResources[resourceIndex].checked = !resources[resourceIndex].checked;
      setResources({ ...cacheResources });
    },
    [resources]
  );

  const getSelectedScopes = () => {
    const isForceChecked = scope =>
      scope.value === "read" &&
      selectedScopeCategories.includes(scope.category);

    const selectedScopes = reduce(
      resources,
      (i, resource, resourceIndex) => {
        i[resourceIndex] = { scopes: [], id: resource.id };

        map(resource.scopes, scope => {
          if (resource.checked || scope.checked || isForceChecked(scope)) {
            const childResourceIndex =
              scope.type === "child"
                ? resourceIndex + "_" + scope.suffix
                : resourceIndex;

            i[childResourceIndex] = i[childResourceIndex]
              ? i[childResourceIndex]
              : { scopes: [], id: resourceIndex };

            i[childResourceIndex].scopes.push({
              value: scope.value,
              id: scope.id,
            });
          }
        });

        return i;
      },
      {}
    );

    return reduce(
      selectedScopes,
      (i, scope, index) => {
        if (scope.length !== 0) i[index] = scope;
        return i;
      },
      {}
    );
  };

  const setPredefinedScopeStatus = ({ resources: definedResources }) => {
    const cacheResources = { ...resources };
    const categories = [];
    map(cacheResources, activeResource => {
      const predefinedResource = definedResources[activeResource.id];

      if (!predefinedResource) {
        activeResource.checked = false;
        map(activeResource.scopes, scope => {
          scope.checked = false;
        });
        setResources(cacheResources);
        return;
      }

      const hasScope = (scope) =>
        predefinedResource.scopes.indexOf(scope) !== -1;

      activeResource.checked = hasScope("*");

      map(activeResource.scopes, scope => {
        scope.checked = hasScope("*") || hasScope(scope.id);
        if (!categories.includes(scope.category) && scope.checked)
          categories.push(scope.category);
      });
    });

    setSelectedScopeCategories(categories);
    setResources(cacheResources);
  };

  const handleScopeGroupChangeHandler = useCallback(
    (role, activeRole) => {
      setActiveRole(activeRole);
      setPredefinedScopeStatus(role);
    },
    [resources]
  );

  const clearActiveRole = () => {
    setActiveRole(null);
  };

  return (
    <div className="retainful_permissions_wrapper">
      <RadioButton
        onChange={handleScopeGroupChangeHandler}
        activeRole={activeRole}
      />
      {map(resources, (resource, resourceIndex) => {
        return (
          <div key={"resource__key__" + resourceIndex}>
            <Resource
              resource={{ ...resource, index: resourceIndex }}
              onChange={resourceClickHandler}
            />
            {map(resource.scopes, (scope, scopeIndex) => {
              return (
                <div key={"scope__key__" + scopeIndex}>
                  <ScopeItem
                  scope={{
                    item: scope,
                    scopeIndex,
                    resourceIndex,
                  }}
                  scopes={resource.scopes}
                  selectedScopeCategories={selectedScopeCategories}
                  forceChecked={resource.checked}
                  onChange={scopeClickHandler}
                />
               </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
});

export default Invite;
