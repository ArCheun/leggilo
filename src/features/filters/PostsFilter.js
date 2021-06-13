import React, {useEffect} from "react";
import {Button, Card, message, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllProviders, providerListLoadingStatusSelector} from "../providers/providersSlice";
import {filtersChanged, selectedProviderIds} from "./filtersSlice";
import {DownloadOutlined} from "@ant-design/icons";
import {fetchPosts} from "../posts/postsSlice";
import LoadingStatus from "../../util/loadingStatus";
import {Meta} from "antd/es/list/Item";

const {Option} = Select;
const maxProviderCountToSelect = 3;
export const PostsFilter = () => {

    const providers = useSelector(fetchAllProviders);
    const providerIds = useSelector(selectedProviderIds);
    const loadingStatus = useSelector(providerListLoadingStatusSelector);

    const dispatch = useDispatch();

    const providerOptions = providers.map(
        provider => <Option key={provider.id} value={provider.id}>{provider.name}</Option>
    );

    const onSelectedProviderIdsChange = (selectedProviderIds) => {
        if (selectedProviderIds.length > 3) {
            message.warn(`Maximum ${maxProviderCountToSelect} providers are allowed to select`);
        }
        dispatch(filtersChanged({selectedProviderIds: selectedProviderIds}));
    };

    const onFetchButtonClick = () => {
        dispatch(fetchPosts(providerIds));
    };

    useEffect(() => {
        if (loadingStatus === LoadingStatus.error) {
            message.error('Something went wrong trying to load the providers.');
        }
    }, [loadingStatus]);

    return (
        <Card>
            <Meta
                title=""
                description={
                    <div>
                        <Select
                            mode="multiple"
                            allowClear
                            loading={loadingStatus === LoadingStatus.loading}
                            style={{width: '86%'}}
                            size="large"
                            placeholder="Please select a content provider"
                            defaultValue={[]}
                            onChange={onSelectedProviderIdsChange}>
                            {providerOptions}
                        </Select>
                        <Button icon={<DownloadOutlined/>}
                                size="large"
                                disabled={providerIds.length > maxProviderCountToSelect}
                                onClick={onFetchButtonClick}>
                            Fetch Posts
                        </Button>
                    </div>
                }
            />
        </Card>
    );
}
